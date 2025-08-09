import { Fragment, useEffect } from 'react';

import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { CommonSlice } from '@global/store/slices/Common.slice';

import { WorkPermissionFormBody } from '@modules/Documents/WorkPermission/features/WorkPermissionFormBody';
import { WorkPermissionPreviewBody } from '@modules/Documents/WorkPermission/features/WorkPermissionPreviewBody';
import { Sidebar } from '@modules/Sidebar';
import { StatusPanel } from '@modules/StatusPanel';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { GlobalContainer } from '@shared/components/GlobalContainer';
import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { useCollectUserWorkPermitDataMutation } from '@global/api/updateUserData/collectData.api';
import { useUploadPhotoMutation } from '@global/api/uploadPhoto/uploadPhoto.api';
import { UserRoles } from '@shared/enums/user.enums';
import { WorkPermissionDocument } from '@shared/interfaces/User.interfaces';
import { dateParser } from '@shared/utils/dateParser';
import { datePartsParser } from '@shared/utils/datePartsParser';

export const WorkPermission = (): JSX.Element => {
  const dispatch = useTypedDispatch();
  const [uploadfile] = useUploadPhotoMutation();
  const [collectUserWorkPermissionData] = useCollectUserWorkPermitDataMutation();

  const employeeId = useTypedSelector((state) => state.employeeReducer.selectedEmployee?._id);
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const { setIsEditModeEnabled } = CommonSlice.actions;
  const workPermissionData = useTypedSelector((state) => state.userReducer.user?.documents.workPermissionDocuments);

  const selectedEmployeeWorkPermissionData = useTypedSelector(
    (state) => state.employeeReducer.selectedEmployee?.documents.workPermissionDocuments
  );

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? workPermissionData : selectedEmployeeWorkPermissionData;

  const methods = useForm<WorkPermissionDocument>({
    defaultValues: {
      workPermitExpirationDate: datePartsParser(currentDataOrigin?.workPermitExpirationDate),
      workPermitDocumentFileKey: currentDataOrigin?.workPermitDocumentFileKey,
      workPermitPaymentDocumentFileKey: currentDataOrigin?.workPermitPaymentDocumentFileKey,
      workPermitApplicationFileKey: currentDataOrigin?.workPermitApplicationFileKey,
    },
  });

  useEffect(() => {
    if (currentDataOrigin) {
      methods.reset({
        workPermitExpirationDate: datePartsParser(currentDataOrigin?.workPermitExpirationDate),
        workPermitDocumentFileKey: currentDataOrigin?.workPermitDocumentFileKey,
        workPermitPaymentDocumentFileKey: currentDataOrigin?.workPermitPaymentDocumentFileKey,
        workPermitApplicationFileKey: currentDataOrigin?.workPermitApplicationFileKey,
      });
    }
  }, [currentDataOrigin]);

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
          data.workPermitDocumentFileKey ?? currentDataOrigin?.workPermitDocumentFileKey
        ),
        workPermitPaymentDocumentFileKey: await upload(
          data.workPermitPaymentDocumentFileKey ?? currentDataOrigin?.workPermitPaymentDocumentFileKey
        ),
        workPermitApplicationFileKey: await upload(
          data.workPermitApplicationFileKey ?? currentDataOrigin?.workPermitApplicationFileKey
        ),
      };

      await collectUserWorkPermissionData({ workPermissionData: payload, employeeId });
      dispatch(setIsEditModeEnabled(false));
    } catch (error) {
      console.error('Failed to save work permission data:', error);
    }
  };

  return (
    <Fragment>
      {userRole !== UserRoles.EMPLOYEE ? (
        <FormProvider {...methods}>
          <GlobalContainer>
            <Sidebar />
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
          </GlobalContainer>
        </FormProvider>
      ) : (
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
      )}
    </Fragment>
  );
};
