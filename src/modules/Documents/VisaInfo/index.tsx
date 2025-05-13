import { useEffect } from 'react';

import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { CommonSlice } from '@global/store/slices/Common.slice';

import { VisaInfoFormBody } from '@modules/Documents/VisaInfo/features/VisaInfoFormBody';
import { VisaInfoPreviewBody } from '@modules/Documents/VisaInfo/features/VisaInfoPreviewBody';
import { StatusPanel } from '@modules/StatusPanel';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { useCollectUserVisaDataMutation } from '@global/api/updateUserData/collectData.api';
import { useUploadPhotoMutation } from '@global/api/uploadPhoto/uploadPhoto.api';
import { VisaInformationDocument } from '@shared/interfaces/User.interfaces';
import { dateParser } from '@shared/utils/dateParser';
import { datePartsParser } from '@shared/utils/datePartsParser';

export const VisaInfo = (): JSX.Element => {
  const visaInformation = useTypedSelector((state) => state.userReducer.user?.documents.visaInformationDocuments);
  const methods = useForm<VisaInformationDocument>({
    defaultValues: {
      visaType: visaInformation?.visaType || '',
      visaDocumentFileKey: visaInformation?.visaDocumentFileKey || '',
      dateOfIssue: datePartsParser(visaInformation?.dateOfIssue),
      expirationDate: datePartsParser(visaInformation?.expirationDate),
    },
  });
  const [uploadPhoto] = useUploadPhotoMutation();
  const [collectUserVisaInfo] = useCollectUserVisaDataMutation();
  const employeeId = useTypedSelector((state) => state.userReducer.user?._id);
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const { setIsEditModeEnabled } = CommonSlice.actions;
  const dispatch = useTypedDispatch();

  useEffect(() => {
    if (visaInformation) {
      methods.reset({
        visaType: visaInformation?.visaType || '',
        visaDocumentFileKey: visaInformation?.visaDocumentFileKey || '',
        dateOfIssue: datePartsParser(visaInformation?.dateOfIssue),
        expirationDate: datePartsParser(visaInformation?.expirationDate),
      });
    }
  }, [visaInformation]);

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
  );
};
