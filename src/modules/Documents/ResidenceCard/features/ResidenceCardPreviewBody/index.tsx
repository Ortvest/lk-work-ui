import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedImagePreview } from '@shared/components/SharedImagePreview';
import { SharedLabel } from '@shared/components/SharedLabel';

import AlertIcon from '@shared/assets/icons/AlertIcon.svg';

import './style.css';

import { useGetUploadedPhotoUrlMutation } from '@global/api/uploadPhoto/uploadPhoto.api';

export const ResidenceCardPreviewBody = (): JSX.Element => {
  const [residenceCardPhotoUrl, setResidenceCardPhotoUrl] = useState('');

  const residenceData = useTypedSelector((state) => state.userReducer.user?.documents.residenceCardDocuments);
  const [getUploadedPhoto] = useGetUploadedPhotoUrlMutation();

  useEffect(() => {
    const fetchResidenceCardPhoto = async (): Promise<void> => {
      if (!residenceData?.residenceCardFileKey) return;

      const { data, error } = await getUploadedPhoto(residenceData.residenceCardFileKey);

      if (error || !data) {
        console.error('Failed to fetch residence card photo URL:', error);
        return;
      }

      setResidenceCardPhotoUrl(data.url);
    };

    fetchResidenceCardPhoto();
  }, []);

  return (
    <fieldset className={classNames('residence-card-preview-fields-wrapper')}>
      <SharedImagePreview imageUrl={residenceCardPhotoUrl || AlertIcon} imageName="Your Residence Card" />
      <SharedLabel title="Card Number:">
        <span>{residenceData?.cardNumber || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Country of Issue:">
        <span>{residenceData?.countryOfIssue || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Date of issue:">
        <span>{residenceData?.dateOfIssue || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Expiration Date:">
        <span>{residenceData?.expirationDate || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Reason for issuance:">
        <span>{residenceData?.reasonForIssuance || '-'}</span>
      </SharedLabel>
    </fieldset>
  );
};
