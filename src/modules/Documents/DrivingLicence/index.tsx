import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { CommonSlice } from '@global/store/slices/Common.slice';

import { DrivingLicenceFormBody } from '@modules/Documents/DrivingLicence/features/DrivingLicenceFormBody';
import { DrivingLicencePreviewBody } from '@modules/Documents/DrivingLicence/features/DrivingLicencePreviewBody';
import { StatusPanel } from '@modules/StatusPanel';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { useCollectUserDrivingLicenceMutation } from '@global/api/updateUserData/collectData.api';
import { useUploadPhotoMutation } from '@global/api/uploadPhoto/uploadPhoto.api';
import { DrivingLicenseDocument, DrivingLicenseDocumentNotUploaded } from '@shared/interfaces/User.interfaces';
import { dateParser } from '@shared/utils/dateParser';

export const DrivingLicence = (): JSX.Element => {
  const methods = useForm<DrivingLicenseDocumentNotUploaded>();
  const [uploadfile] = useUploadPhotoMutation();
  const [collectUserDrivingLicenceData] = useCollectUserDrivingLicenceMutation();
  const employeeId = useTypedSelector((state) => state.userReducer.user?._id);
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const { setIsEditModeEnabled } = CommonSlice.actions;
  const dispatch = useTypedDispatch();

  const onSaveHandler = async (data: DrivingLicenseDocumentNotUploaded): Promise<void> => {
    if (!employeeId) return;

    try {
      const upload = async (file?: File): Promise<string> => {
        if (!file) return '';
        const formData = new FormData();
        formData.append('file', file);
        return (await uploadfile(formData)).data?.fileKey ?? '';
      };

      const frontKey = await upload(data.drivingLicenceFrontCardFile);
      const backKey = await upload(data.drivingLicenceBackCardFile);

      const parsedData: DrivingLicenseDocument = {
        drivingLicenceFrontCardFileKey: frontKey,
        drivingLicenceBackCardFileKey: backKey,
        drivingLicenceCategories: [...(data.drivingLicenceCategories || [])],
        drivingLicenseDateOfIssue: dateParser(JSON.stringify(data.drivingLicenseDateOfIssue)),
        drivingLicenseExpirationDate: dateParser(JSON.stringify(data.drivingLicenseExpirationDate)),
      };

      await collectUserDrivingLicenceData({ drivingLicenceData: parsedData, employeeId });
      dispatch(setIsEditModeEnabled(false));
    } catch (error) {
      console.error('Failed to save driving licence data:', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <section className={classNames('driving-licence')}>
        <form className={classNames('driving-licence-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <StatusPanel />
          <SharedSectionHeader
            title="Driving Licence"
            subtitle="Leave a photo of the document. Make sure the document is in good quality."
          />
          {isEditModeEnabled ? <DrivingLicenceFormBody /> : <DrivingLicencePreviewBody />}
        </form>
      </section>
    </FormProvider>
  );
};
