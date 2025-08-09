import { Fragment, useEffect } from 'react';

import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { CommonSlice } from '@global/store/slices/Common.slice';

import { PassportFormBody } from '@modules/Documents/Passport/features/PassportFormBody';
import { PassportPreviewBody } from '@modules/Documents/Passport/features/PassportPreviewBody';
import { Sidebar } from '@modules/Sidebar';
import { StatusPanel } from '@modules/StatusPanel';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { GlobalContainer } from '@shared/components/GlobalContainer';
import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { useCollectUserPassportDataMutation } from '@global/api/updateUserData/collectData.api';
import { useUploadPhotoMutation } from '@global/api/uploadPhoto/uploadPhoto.api';
import { UserRoles } from '@shared/enums/user.enums';
import { PassportDocument } from '@shared/interfaces/User.interfaces';
import { dateParser } from '@shared/utils/dateParser';
import { datePartsParser } from '@shared/utils/datePartsParser';

export const Passport = (): JSX.Element => {
  const passportDocumentsData = useTypedSelector((state) => state.userReducer.user?.documents.passportDocuments);
  const selectedEmployeePassportDocumentsData = useTypedSelector(
    (state) => state.employeeReducer.selectedEmployee?.documents.passportDocuments
  );

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const currentDataOrigin =
    userRole === UserRoles.EMPLOYEE ? passportDocumentsData : selectedEmployeePassportDocumentsData;
  const [uploadfile] = useUploadPhotoMutation();
  const [collectPassportData] = useCollectUserPassportDataMutation();
  const employeeId = useTypedSelector((state) => state.employeeReducer.selectedEmployee?._id);
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const { setIsEditModeEnabled } = CommonSlice.actions;
  const dispatch = useTypedDispatch();

  const methods = useForm<PassportDocument>({
    defaultValues: {
      passportFileKey: currentDataOrigin?.passportFileKey || '',
      passportNumber: currentDataOrigin?.passportNumber || '',
      passportExpirationDate: datePartsParser(currentDataOrigin?.passportExpirationDate),
      passportDateOfIssue: datePartsParser(currentDataOrigin?.passportDateOfIssue),
    },
  });

  const onSaveHandler = async (data: PassportDocument): Promise<void> => {
    if (!employeeId) return;

    try {
      const fileKey = await (async (): Promise<string> => {
        if (data.passportFileKey instanceof File) {
          const formData = new FormData();
          formData.append('file', data.passportFileKey);
          const uploaded = await uploadfile(formData);
          const uploadedKey = uploaded.data?.fileKey;
          if (!uploadedKey) throw new Error('File upload failed or no key returned');
          return uploadedKey;
        }

        if (typeof data.passportFileKey === 'string') {
          return data.passportFileKey;
        }

        throw new Error('Invalid type for passportFileKey');
      })();

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

  useEffect(() => {
    if (currentDataOrigin) {
      methods.reset({
        passportFileKey: currentDataOrigin?.passportFileKey || '',
        passportNumber: currentDataOrigin?.passportNumber,
        passportExpirationDate: datePartsParser(currentDataOrigin?.passportExpirationDate),
        passportDateOfIssue: datePartsParser(currentDataOrigin?.passportDateOfIssue),
      });
    }
  }, [currentDataOrigin]);

  return (
    <Fragment>
      {userRole !== UserRoles.EMPLOYEE ? (
        <FormProvider {...methods}>
          <GlobalContainer>
            <Sidebar />
            <section className={classNames('passport')}>
              <form className={classNames('passport-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
                <StatusPanel />
                <SharedSectionHeader title="Passport" subtitle="Fill in your passport details" />
                {isEditModeEnabled ? <PassportFormBody /> : <PassportPreviewBody />}
              </form>
            </section>
          </GlobalContainer>
        </FormProvider>
      ) : (
        <FormProvider {...methods}>
          <section className={classNames('passport')}>
            <form className={classNames('passport-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
              <StatusPanel />
              <SharedSectionHeader title="Passport" subtitle="Fill in your passport details" />
              {isEditModeEnabled ? <PassportFormBody /> : <PassportPreviewBody />}
            </form>
          </section>
        </FormProvider>
      )}
    </Fragment>
  );
};
