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
import { VisaInformationDocument, VisaInformationDocumentNotUploaded } from '@shared/interfaces/User.interfaces';
import { dateParser } from '@shared/utils/dateParser';

export const VisaInfo = (): JSX.Element => {
  const methods = useForm<VisaInformationDocumentNotUploaded>();
  const [uploadPhoto] = useUploadPhotoMutation();
  const [collectUserVisaInfo] = useCollectUserVisaDataMutation();
  const employeeId = useTypedSelector((state) => state.userReducer.user?._id);
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const { setIsEditModeEnabled } = CommonSlice.actions;
  const dispatch = useTypedDispatch();

  const onSaveHandler = async (data: VisaInformationDocumentNotUploaded): Promise<void> => {
    if (!employeeId) return;

    try {
      const formData = new FormData();
      formData.append('file', data.visaDocumentFile);
      const fileKey = (await uploadPhoto(formData)).data?.fileKey;

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
