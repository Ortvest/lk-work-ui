import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedImagePreview } from '@shared/components/SharedImagePreview';
import { SharedLabel } from '@shared/components/SharedLabel';

import FilePreviewIcon from '@shared/assets/icons/FilePreviewIcon.svg';

import './style.css';

import { useGetUploadedPhotoUrlMutation } from '@global/api/uploadPhoto/uploadPhoto.api';
import { UserRoles } from '@shared/enums/user.enums';
import { useTranslation } from "react-i18next";

export const DrivingLicencePreviewBody = (): JSX.Element => {
  const [drivingLicencePhotosUrls, setDrivingLicencePhotosUrls] = useState({
    front: '',
    back: '',
  });

  const drivingLicenceData = useTypedSelector(
    (state) => state.userReducer.user?.documents.drivingLicenceDocuments
  );
  const selectedEmployeeDrivingLicenceData = useTypedSelector(
    (state) => state.employeeReducer.selectedEmployee?.documents.drivingLicenceDocuments
  );

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const currentDataOrigin =
    userRole === UserRoles.EMPLOYEE ? drivingLicenceData : selectedEmployeeDrivingLicenceData;

  const [getUploadedPhoto] = useGetUploadedPhotoUrlMutation();
  const {t} = useTranslation('employee-sidebar');

  useEffect(() => {
    const fetchDrivingLicencePhotos = async (): Promise<void> => {
      const [frontPhoto, backPhoto] = await Promise.all([
        currentDataOrigin?.drivingLicenceFrontCardFileKey
          ? getUploadedPhoto(currentDataOrigin.drivingLicenceFrontCardFileKey as string).unwrap()
          : Promise.resolve(null),
        currentDataOrigin?.drivingLicenceBackCardFileKey
          ? getUploadedPhoto(currentDataOrigin.drivingLicenceBackCardFileKey as string).unwrap()
          : Promise.resolve(null),
      ]);

      setDrivingLicencePhotosUrls({
        front: frontPhoto?.url ?? FilePreviewIcon,
        back: backPhoto?.url ?? FilePreviewIcon,
      });
    };

    fetchDrivingLicencePhotos();
  }, []);

  return (
    <fieldset className={classNames('driving-licence-preview-fields-wrapper')}>
      <SharedImagePreview
        imageUrl={drivingLicencePhotosUrls.front}
        imageName={t('drivingLicenceFront')}
      />
      <SharedImagePreview
        imageUrl={drivingLicencePhotosUrls.back}
        imageName={t('drivingLicenceBack')}
      />
      <SharedLabel title={t('drivingLicenceCategories')}>
        <span>{currentDataOrigin?.drivingLicenceCategories || '-'}</span>
      </SharedLabel>
      <SharedLabel title={t('drivingLicenceDateOfIssue')}>
        <span>{(currentDataOrigin?.drivingLicenseDateOfIssue as string) || '-'}</span>
      </SharedLabel>
      <SharedLabel title={t('drivingLicenceExpirationDate')}>
        <span>{(currentDataOrigin?.drivingLicenseExpirationDate as string) || '-'}</span>
      </SharedLabel>
    </fieldset>
  );
};
