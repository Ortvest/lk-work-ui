import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedImagePreview } from '@shared/components/SharedImagePreview';
import { SharedLabel } from '@shared/components/SharedLabel';

import AlertIcon from '@shared/assets/icons/AlertIcon.svg';

import './style.css';

import { useGetUploadedPhotoUrlMutation } from '@global/api/uploadPhoto/uploadPhoto.api';

export const PassportPreviewBody = (): JSX.Element => {
  const [passportPreviewPhoto, setPassportPreviewPhoto] = useState('');

  const passportData = useTypedSelector((state) => state.userReducer.user?.documents.passportDocuments);
  const [getUploadedPhoto] = useGetUploadedPhotoUrlMutation();

  useEffect(() => {
    const getPassportPhotoUrl = async (): Promise<void> => {
      if (!passportData?.passportFileKey) return;

      const { data, error } = await getUploadedPhoto(passportData.passportFileKey as string);

      if (error || !data) {
        console.error('Failed to get passport photo url:', error);
        return;
      }

      setPassportPreviewPhoto(data.url);
    };

    getPassportPhotoUrl();
  }, []);

  return (
    <fieldset className={classNames('passport-preview-fields-wrapper')}>
      <SharedImagePreview imageUrl={passportPreviewPhoto} imageName="Your passport" />
      <SharedLabel title="PassportNumber:">
        <span>{passportData?.passportNumber || AlertIcon}</span>
      </SharedLabel>
      <SharedLabel title="Date of issue:">
        <span>{(passportData?.passportDateOfIssue as string) || AlertIcon}</span>
      </SharedLabel>
      <SharedLabel title="Expiration Date:">
        <span>{(passportData?.passportExpirationDate as string) || AlertIcon}</span>
      </SharedLabel>
    </fieldset>
  );
};
