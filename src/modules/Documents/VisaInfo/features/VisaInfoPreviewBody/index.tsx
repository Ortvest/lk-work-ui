import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedImagePreview } from '@shared/components/SharedImagePreview';
import { SharedLabel } from '@shared/components/SharedLabel';

import AlertIcon from '@shared/assets/icons/AlertIcon.svg';

import './style.css';

import { useGetUploadedPhotoUrlMutation } from '@global/api/uploadPhoto/uploadPhoto.api';

export const VisaInfoPreviewBody = (): JSX.Element => {
  const [visaPreviewPhoto, setVisaPreviewPhoto] = useState('');

  const visaData = useTypedSelector((state) => state.userReducer.user?.documents.visaInformationDocuments);
  const [getUploadedPhoto] = useGetUploadedPhotoUrlMutation();

  useEffect(() => {
    const fetchVisaPhoto = async (): Promise<void> => {
      if (!visaData?.visaDocumentFileKey) return;

      const { data, error } = await getUploadedPhoto(visaData.visaDocumentFileKey);

      if (error || !data) {
        console.error('Failed to fetch visa document preview:', error);
        return;
      }

      setVisaPreviewPhoto(data.url);
    };

    fetchVisaPhoto();
  }, []);

  return (
    <fieldset className={classNames('visa-info-preview-fields-wrapper')}>
      <SharedImagePreview imageUrl={visaPreviewPhoto || AlertIcon} imageName="Visa Document" />
      <SharedLabel title="Visa Type:">
        <span>{visaData?.visaType || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Date of issue:">
        <span>{visaData?.dateOfIssue || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Expiration Date:">
        <span>{visaData?.expirationDate || '-'}</span>
      </SharedLabel>
    </fieldset>
  );
};
