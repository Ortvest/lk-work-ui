import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { CommonSlice } from '@global/store/slices/Common.slice';

import { ResidenceCardFormBody } from '@modules/Documents/ResidenceCard/features/ResidenceCardFormBody';
import { ResidenceCardPreviewBody } from '@modules/Documents/ResidenceCard/features/ResidenceCardPreviewBody';
import { StatusPanel } from '@modules/StatusPanel';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedSectionHeader } from '@shared/components/SharedSectionHeader';

import './style.css';

import { useCollectUserResidenceDataMutation } from '@global/api/updateUserData/collectData.api';
import { useUploadPhotoMutation } from '@global/api/uploadPhoto/uploadPhoto.api';
import { ResidenceCardDocument, ResidenceCardDocumentNotUploaded } from '@shared/interfaces/User.interfaces';
import { dateParser } from '@shared/utils/dateParser';

export const ResidenceCard = (): JSX.Element => {
  const methods = useForm<ResidenceCardDocumentNotUploaded>();
  const [uploadFile] = useUploadPhotoMutation();
  const [collectResidenceCardData] = useCollectUserResidenceDataMutation();
  const employeeId = useTypedSelector((state) => state.userReducer.user?._id);
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const { setIsEditModeEnabled } = CommonSlice.actions;
  const dispatch = useTypedDispatch();

  const onSaveHandler = async (data: ResidenceCardDocumentNotUploaded): Promise<void> => {
    if (!employeeId) return;

    try {
      const formData = new FormData();
      formData.append('file', data.residenceCardFile);
      const fileKey = (await uploadFile(formData)).data?.fileKey ?? '';

      const parsedData: ResidenceCardDocument = {
        cardNumber: data.cardNumber,
        countryOfIssue: data.countryOfIssue,
        dateOfIssue: dateParser(JSON.stringify(data.dateOfIssue!)),
        expirationDate: dateParser(JSON.stringify(data.expirationDate!)),
        reasonForIssuance: data.reasonForIssuance,
        residenceCardFileKey: fileKey,
      };

      await collectResidenceCardData({ userResidenceData: parsedData, employeeId });
      dispatch(setIsEditModeEnabled(false));
    } catch (error) {
      console.error('Failed to save residence card data:', error);
    }
  };

  return (
    <FormProvider {...methods}>
      <section className={classNames('residence-card')}>
        <form className={classNames('residence-card-form')} onSubmit={methods.handleSubmit(onSaveHandler)}>
          <StatusPanel />
          <SharedSectionHeader
            title="Residence Card"
            subtitle="Leave a photo of the document. Make sure the document is in good quality."
          />
          {isEditModeEnabled ? <ResidenceCardFormBody /> : <ResidenceCardPreviewBody />}
        </form>
      </section>
    </FormProvider>
  );
};
