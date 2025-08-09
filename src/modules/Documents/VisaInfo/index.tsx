import { Fragment, useEffect } from 'react';

import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { CommonSlice } from '@global/store/slices/Common.slice';

import { VisaInfoFormBody } from '@modules/Documents/VisaInfo/features/VisaInfoFormBody';
import { VisaInfoPreviewBody } from '@modules/Documents/VisaInfo/features/VisaInfoPreviewBody';
import { Sidebar } from '@modules/Sidebar';
import { StatusPanel } from '@modules/StatusPanel';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { GlobalContainer } from '@shared/components/GlobalContainer';
import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { useCollectUserVisaDataMutation } from '@global/api/updateUserData/collectData.api';
import { useUploadPhotoMutation } from '@global/api/uploadPhoto/uploadPhoto.api';
import { UserRoles } from '@shared/enums/user.enums';
import { VisaInformationDocument } from '@shared/interfaces/User.interfaces';
import { dateParser } from '@shared/utils/dateParser';
import { datePartsParser } from '@shared/utils/datePartsParser';

export const VisaInfo = (): JSX.Element => {
  const visaInformation = useTypedSelector((state) => state.userReducer.user?.documents.visaInformationDocuments);

  const selectedEmployeeVisaInformation = useTypedSelector(
    (state) => state.employeeReducer.selectedEmployee?.documents.visaInformationDocuments
  );

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? visaInformation : selectedEmployeeVisaInformation;

  const methods = useForm<VisaInformationDocument>({
    defaultValues: {
      visaType: currentDataOrigin?.visaType || '',
      visaDocumentFileKey: currentDataOrigin?.visaDocumentFileKey || '',
      dateOfIssue: datePartsParser(currentDataOrigin?.dateOfIssue),
      expirationDate: datePartsParser(currentDataOrigin?.expirationDate),
    },
  });
  const [uploadPhoto] = useUploadPhotoMutation();
  const [collectUserVisaInfo] = useCollectUserVisaDataMutation();
  const employeeId = useTypedSelector((state) => state.employeeReducer.selectedEmployee?._id);
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const { setIsEditModeEnabled } = CommonSlice.actions;
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (currentDataOrigin) {
      methods.reset({
        visaType: currentDataOrigin?.visaType || '',
        visaDocumentFileKey: currentDataOrigin?.visaDocumentFileKey || '',
        dateOfIssue: datePartsParser(currentDataOrigin?.dateOfIssue),
        expirationDate: datePartsParser(currentDataOrigin?.expirationDate),
      });
    }
  }, [currentDataOrigin]);

  const onSaveHandler = async (data: VisaInformationDocument): Promise<void> => {
    if (!employeeId) return;

    try {
      let fileKey = '';
      if (data.visaDocumentFileKey instanceof File) {
        const formData = new FormData();
        formData.append('file', data.visaDocumentFileKey);
        fileKey = (await uploadPhoto(formData)).data?.fileKey ?? '';
      } else {
        fileKey = data.visaDocumentFileKey ?? '';
      }

      const parsedData: VisaInformationDocument = {
        visaType: data.visaType,
        dateOfIssue: dateParser(JSON.stringify(data.dateOfIssue!)),
        expirationDate: dateParser(JSON.stringify(data.expirationDate!)),
        visaDocumentFileKey: fileKey,
      };

      await collectUserVisaInfo({ userVisaData: parsedData, employeeId });
      dispatch(setIsEditModeEnabled(false));
    } catch (error) {
      console.error('Failed to save visa info:', error);
    }
  };

  return (
    <Fragment>
      {userRole !== UserRoles.EMPLOYEE ? (
        <FormProvider {...methods}>
          <GlobalContainer>
            <Sidebar />
            <section className={classNames('visa-info')}>
              <form className={classNames('visa-info-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
                <StatusPanel />
                <SharedSectionHeader
                  title="Visa Information"
                  subtitle="Leave a photo of the document. Make sure the document is in good quality."
                />
                {isEditModeEnabled ? <VisaInfoFormBody /> : <VisaInfoPreviewBody />}
              </form>
            </section>
          </GlobalContainer>
        </FormProvider>
      ) : (
        <FormProvider {...methods}>
          <section className={classNames('visa-info')}>
            <form className={classNames('visa-info-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
              <StatusPanel />
              <SharedSectionHeader
                title="Visa Information"
                subtitle="Leave a photo of the document. Make sure the document is in good quality."
              />
              {isEditModeEnabled ? <VisaInfoFormBody /> : <VisaInfoPreviewBody />}
            </form>
          </section>
        </FormProvider>
      )}
    </Fragment>
  );
};
