import { useEffect } from 'react';

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
import { DrivingLicenseDocument } from '@shared/interfaces/User.interfaces';
import { dateParser } from '@shared/utils/dateParser';
import { datePartsParser } from '@shared/utils/datePartsParser';

export const DrivingLicence = (): JSX.Element => {
  const drivingLicenceData = useTypedSelector((state) => state.userReducer.user?.documents.drivingLicenceDocuments);

  const methods = useForm<DrivingLicenseDocument>({
    defaultValues: {
      drivingLicenceCategories: drivingLicenceData?.drivingLicenceCategories || [],
      drivingLicenceFrontCardFileKey: drivingLicenceData?.drivingLicenceFrontCardFileKey || '',
      drivingLicenceBackCardFileKey: drivingLicenceData?.drivingLicenceBackCardFileKey || '',
      drivingLicenseDateOfIssue: datePartsParser(drivingLicenceData?.drivingLicenseDateOfIssue),
      drivingLicenseExpirationDate: datePartsParser(drivingLicenceData?.drivingLicenseExpirationDate),
    },
  });
  const [uploadfile] = useUploadPhotoMutation();
  const [collectUserDrivingLicenceData] = useCollectUserDrivingLicenceMutation();
  const employeeId = useTypedSelector((state) => state.userReducer.user?._id);
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const { setIsEditModeEnabled } = CommonSlice.actions;
  const dispatch = useTypedDispatch();

  const onSaveHandler = async (data: DrivingLicenseDocument): Promise<void> => {
    if (!employeeId) return;

    try {
      const upload = async (file?: File | string): Promise<string> => {
        if (!file || typeof file === 'string') return file ?? '';
        const formData = new FormData();
        formData.append('file', file);
        return (await uploadfile(formData)).data?.fileKey ?? '';
      };

      const frontKey = await upload(data.drivingLicenceFrontCardFileKey);
      const backKey = await upload(data.drivingLicenceBackCardFileKey);

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

  useEffect(() => {
    if (drivingLicenceData) {
      methods.reset({
        drivingLicenceCategories: drivingLicenceData?.drivingLicenceCategories || [],
        drivingLicenceFrontCardFileKey: drivingLicenceData?.drivingLicenceFrontCardFileKey || '',
        drivingLicenceBackCardFileKey: drivingLicenceData?.drivingLicenceBackCardFileKey || '',
        drivingLicenseDateOfIssue: datePartsParser(drivingLicenceData?.drivingLicenseDateOfIssue),
        drivingLicenseExpirationDate: datePartsParser(drivingLicenceData?.drivingLicenseExpirationDate),
      });
    }
  }, [drivingLicenceData]);

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
