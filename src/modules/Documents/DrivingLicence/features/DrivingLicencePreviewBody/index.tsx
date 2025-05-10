import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedImagePreview } from '@shared/components/SharedImagePreview';
import { SharedLabel } from '@shared/components/SharedLabel';

import AlertIcon from '@shared/assets/icons/AlertIcon.svg';

import './style.css';

import { useGetUploadedPhotoUrlMutation } from '@global/api/uploadPhoto/uploadPhoto.api';

export const DrivingLicencePreviewBody = (): JSX.Element => {
  const [drivingLicencePhotosUrls, setDrivingLicencePhotosUrls] = useState({
    drivingLicenceFrontCardPhotoUrl: '',
    drivingLicenceBackCardPhotoUrl: '',
  });
  const drivingLicenceData = useTypedSelector((state) => state.userReducer.user?.documents.drivingLicenceDocuments);

  const [getUploadedPhoto] = useGetUploadedPhotoUrlMutation();

  useEffect(() => {
    const getDrivingLicencePhotosUrl = async (): Promise<void> => {
      const [drivingLicenceFrontCardPhotoResponse, drivingLicenceBackCardPhotoResponse] = await Promise.all([
        drivingLicenceData?.drivingLicenceFrontCardFileKey
          ? getUploadedPhoto(drivingLicenceData?.drivingLicenceFrontCardFileKey).unwrap()
          : Promise.resolve(null),
        drivingLicenceData?.drivingLicenceBackCardFileKey
          ? getUploadedPhoto(drivingLicenceData?.drivingLicenceBackCardFileKey).unwrap()
          : Promise.resolve(null),
      ]);

      setDrivingLicencePhotosUrls({
        drivingLicenceFrontCardPhotoUrl: drivingLicenceFrontCardPhotoResponse?.url ?? AlertIcon,
        drivingLicenceBackCardPhotoUrl: drivingLicenceBackCardPhotoResponse?.url ?? AlertIcon,
      });
    };

    getDrivingLicencePhotosUrl();
  }, []);

  return (
    <fieldset className={classNames('driving-licence-preview-fields-wrapper')}>
      <SharedImagePreview
        imageName="Driving Licence - Front"
        imageUrl={drivingLicencePhotosUrls.drivingLicenceFrontCardPhotoUrl}
      />
      <SharedImagePreview
        imageName="Driving Licence - Back"
        imageUrl={drivingLicencePhotosUrls.drivingLicenceBackCardPhotoUrl}
      />
      <SharedLabel title="Driving Licence Categories">
        <span>{drivingLicenceData?.drivingLicenceCategories || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Date of issue:">
        <span>{drivingLicenceData?.drivingLicenseDateOfIssue || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Expiration Date:">
        <span>{drivingLicenceData?.drivingLicenseExpirationDate || '-'}</span>
      </SharedLabel>
    </fieldset>
  );
};
