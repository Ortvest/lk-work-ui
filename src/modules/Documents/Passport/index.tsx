import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { CommonSlice } from '@global/store/slices/Common.slice';

import { PassportFormBody } from '@modules/Documents/Passport/features/PassportFormBody';
import { PassportPreviewBody } from '@modules/Documents/Passport/features/PassportPreviewBody';
import { StatusPanel } from '@modules/StatusPanel';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { useCollectUserPassportDataMutation } from '@global/api/updateUserData/collectData.api';
import { useUploadPhotoMutation } from '@global/api/uploadPhoto/uploadPhoto.api';
import { PassportDocument, PassportDocumentsUploadData } from '@shared/interfaces/User.interfaces';
import { dateParser } from '@shared/utils/dateParser';

export const Passport = (): JSX.Element => {
  const methods = useForm<PassportDocumentsUploadData>();
  const [uploadfile] = useUploadPhotoMutation();
  const [collectPassportData] = useCollectUserPassportDataMutation();
  const employeeId = useTypedSelector((state) => state.userReducer.user?._id);
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const { setIsEditModeEnabled } = CommonSlice.actions;
  const dispatch = useTypedDispatch();

  const onSaveHandler = async (data: PassportDocumentsUploadData): Promise<void> => {
    if (!employeeId) return;

    try {
      const formData = new FormData();
      formData.append('file', data.passportFile);
      const fileKey = (await uploadfile(formData)).data?.fileKey;

      const parsedData: PassportDocument = {
        passportNumber: data.passportNumber,
        passportDateOfIssue: dateParser(JSON.stringify(data.passportDateOfIssue!)),
        passportExpirationDate: dateParser(JSON.stringify(data.passportExpirationDate!)),
        passportFileKey: fileKey,
      };

      await collectPassportData({ passportData: parsedData, employeeId });
      dispatch(setIsEditModeEnabled(false));
    } catch (error) {
      console.error('Failed to save passport data:', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <section className={classNames('passport')}>
        <form className={classNames('passport-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <StatusPanel />
          <SharedSectionHeader title="Passport" subtitle="Fill in your passport details" />
          {isEditModeEnabled ? <PassportFormBody /> : <PassportPreviewBody />}
        </form>
      </section>
    </FormProvider>
  );
};
