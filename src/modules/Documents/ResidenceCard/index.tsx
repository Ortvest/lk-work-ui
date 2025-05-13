import { useEffect } from 'react';

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
import { ResidenceCardDocument } from '@shared/interfaces/User.interfaces';
import { dateParser } from '@shared/utils/dateParser';
import { datePartsParser } from '@shared/utils/datePartsParser';

export const ResidenceCard = (): JSX.Element => {
  const residenceCardData = useTypedSelector((state) => state.userReducer.user?.documents.residenceCardDocuments);

  const methods = useForm<ResidenceCardDocument>({
    defaultValues: {
      cardNumber: residenceCardData?.cardNumber ?? '',
      countryOfIssue: residenceCardData?.countryOfIssue ?? '',
      dateOfIssue: datePartsParser(residenceCardData?.dateOfIssue),
      expirationDate: datePartsParser(residenceCardData?.expirationDate),
      reasonForIssuance: residenceCardData?.reasonForIssuance ?? '',
      residenceCardFileKey: residenceCardData?.residenceCardFileKey ?? '',
    },
  });

  const [uploadFile] = useUploadPhotoMutation();
  const [collectResidenceCardData] = useCollectUserResidenceDataMutation();
  const employeeId = useTypedSelector((state) => state.userReducer.user?._id);
  const { isEditModeEnabled } = useTypedSelector((state) => state.CommonReducer);
  const { setIsEditModeEnabled } = CommonSlice.actions;
  const dispatch = useTypedDispatch();

  const onSaveHandler = async (data: ResidenceCardDocument): Promise<void> => {
    if (!employeeId) return;

    try {
      let fileKey = '';
      if (data.residenceCardFileKey instanceof File) {
        const formData = new FormData();
        formData.append('file', data.residenceCardFileKey);
        fileKey = (await uploadFile(formData)).data?.fileKey ?? '';
      } else {
        fileKey = data.residenceCardFileKey ?? '';
      }

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

  useEffect(() => {
    if (isEditModeEnabled && residenceCardData) {
      methods.reset({
        cardNumber: residenceCardData?.cardNumber ?? '',
        countryOfIssue: residenceCardData?.countryOfIssue ?? '',
        dateOfIssue: datePartsParser(residenceCardData?.dateOfIssue),
        expirationDate: datePartsParser(residenceCardData?.expirationDate),
        reasonForIssuance: residenceCardData?.reasonForIssuance ?? '',
        residenceCardFileKey: residenceCardData?.residenceCardFileKey ?? '',
      });
    }
  }, [isEditModeEnabled, residenceCardData, methods]);

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
