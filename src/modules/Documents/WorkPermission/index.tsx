import { useEffect } from 'react';

import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { CommonSlice } from '@global/store/slices/Common.slice';

import { WorkPermissionFormBody } from '@modules/Documents/WorkPermission/features/WorkPermissionFormBody';
import { WorkPermissionPreviewBody } from '@modules/Documents/WorkPermission/features/WorkPermissionPreviewBody';
import { StatusPanel } from '@modules/StatusPanel';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { useCollectUserWorkPermitDataMutation } from '@global/api/updateUserData/collectData.api';
import { useUploadPhotoMutation } from '@global/api/uploadPhoto/uploadPhoto.api';
import { WorkPermissionDocument } from '@shared/interfaces/User.interfaces';
import { dateParser } from '@shared/utils/dateParser';
import { datePartsParser } from '@shared/utils/datePartsParser';

export const WorkPermission = (): JSX.Element => {
  const dispatch = useTypedDispatch();
  const [uploadfile] = useUploadPhotoMutation();
  const [collectUserWorkPermissionData] = useCollectUserWorkPermitDataMutation();

  const employeeId = useTypedSelector((state) => state.userReducer.user?._id);
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const { setIsEditModeEnabled } = CommonSlice.actions;
  const workPermissionData = useTypedSelector((state) => state.userReducer.user?.documents.workPermissionDocuments);

  const methods = useForm<WorkPermissionDocument>({
    defaultValues: {
      workPermitExpirationDate: datePartsParser(workPermissionData?.workPermitExpirationDate),
      workPermitDocumentFileKey: workPermissionData?.workPermitDocumentFileKey,
      workPermitPaymentDocumentFileKey: workPermissionData?.workPermitPaymentDocumentFileKey,
      workPermitApplicationFileKey: workPermissionData?.workPermitApplicationFileKey,
    },
  });

  useEffect(() => {
    if (workPermissionData) {
      methods.reset({
        workPermitExpirationDate: datePartsParser(workPermissionData?.workPermitExpirationDate),
        workPermitDocumentFileKey: workPermissionData?.workPermitDocumentFileKey,
        workPermitPaymentDocumentFileKey: workPermissionData?.workPermitPaymentDocumentFileKey,
        workPermitApplicationFileKey: workPermissionData?.workPermitApplicationFileKey,
      });
    }
  }, [workPermissionData]);

  const onSaveHandler = async (data: WorkPermissionDocument): Promise<void> => {
    if (!employeeId) return;

    const upload = async (input: string | File | undefined): Promise<string> => {
      if (!input) return '';
      if (input instanceof File) {
        const formData = new FormData();
        formData.append('file', input);
        const response = await uploadfile(formData).unwrap();
        return response.fileKey;
      }
      return input;
    };

    try {
      const payload: WorkPermissionDocument = {
        workPermitExpirationDate: dateParser(JSON.stringify(data.workPermitExpirationDate)),
        workPermitDocumentFileKey: await upload(
          data.workPermitDocumentFileKey ?? workPermissionData?.workPermitDocumentFileKey
        ),
        workPermitPaymentDocumentFileKey: await upload(
          data.workPermitPaymentDocumentFileKey ?? workPermissionData?.workPermitPaymentDocumentFileKey
        ),
        workPermitApplicationFileKey: await upload(
          data.workPermitApplicationFileKey ?? workPermissionData?.workPermitApplicationFileKey
        ),
      };

      await collectUserWorkPermissionData({ workPermissionData: payload, employeeId });
      dispatch(setIsEditModeEnabled(false));
    } catch (error) {
      console.error('Failed to save work permission data:', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <section className={classNames('work-permission')}>
        <form className={classNames('work-permission-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <StatusPanel />
          <SharedSectionHeader
            title="Work Permission"
            subtitle="Leave a photo of the document. Make sure the document is in good quality."
          />
          {isEditModeEnabled ? <WorkPermissionFormBody /> : <WorkPermissionPreviewBody />}
        </form>
      </section>
    </FormProvider>
  );
};
