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
import { WorkPermissionDocument, WorkPermissiontNotUploadedData } from '@shared/interfaces/User.interfaces';
import { dateParser } from '@shared/utils/dateParser';

export const WorkPermission = (): JSX.Element => {
  const methods = useForm<WorkPermissionDocument>();
  const [uploadfile] = useUploadPhotoMutation();
  const [collectUserWorkPermissionData] = useCollectUserWorkPermitDataMutation();
  const employeeId = useTypedSelector((state) => state.userReducer.user?._id);
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const { setIsEditModeEnabled } = CommonSlice.actions;
  const dispatch = useTypedDispatch();

  const onSaveHandler = async (data: WorkPermissiontNotUploadedData): Promise<void> => {
    if (!employeeId) return;

    try {
      const upload = async (file?: File): Promise<string> => {
        if (!file) return '';
        const formData = new FormData();
        formData.append('file', file);
        return (await uploadfile(formData)).data?.fileKey ?? '';
      };

      const workPermitKey = await upload(data.workPermitDocumentFile);
      const paymentKey = await upload(data.workPermitPaymentDocumentFile);
      const applicationKey = await upload(data.workPermitApplicationFile);

      const parsedData: WorkPermissionDocument = {
        workPermitDocumentFileKey: workPermitKey,
        workPermitPaymentDocumentFileKey: paymentKey,
        workPermitApplicationFileKey: applicationKey,
        workPermitExpirationDate: dateParser(JSON.stringify(data.workPermitExpirationDate)),
      };

      await collectUserWorkPermissionData({ workPermissionData: parsedData, employeeId });
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
