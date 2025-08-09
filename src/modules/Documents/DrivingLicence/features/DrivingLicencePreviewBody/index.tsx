import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedImagePreview } from '@shared/components/SharedImagePreview';
import { SharedLabel } from '@shared/components/SharedLabel';

import AlertIcon from '@shared/assets/icons/AlertIcon.svg';

import './style.css';

import { useGetUploadedPhotoUrlMutation } from '@global/api/uploadPhoto/uploadPhoto.api';
import { UserRoles } from '@shared/enums/user.enums';

export const DrivingLicencePreviewBody = (): JSX.Element => {
  const [drivingLicencePhotosUrls, setDrivingLicencePhotosUrls] = useState({
    drivingLicenceFrontCardPhotoUrl: '',
    drivingLicenceBackCardPhotoUrl: '',
  });
  const drivingLicenceData = useTypedSelector((state) => state.userReducer.user?.documents.drivingLicenceDocuments);

  const selectedEmployeeDrivingLicenceData = useTypedSelector(
    (state) => state.employeeReducer.selectedEmployee?.documents.drivingLicenceDocuments
  );

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? drivingLicenceData : selectedEmployeeDrivingLicenceData;

  const [getUploadedPhoto] = useGetUploadedPhotoUrlMutation();

  useEffect(() => {
    const getDrivingLicencePhotosUrl = async (): Promise<void> => {
      const [drivingLicenceFrontCardPhotoResponse, drivingLicenceBackCardPhotoResponse] = await Promise.all([
        currentDataOrigin?.drivingLicenceFrontCardFileKey
          ? getUploadedPhoto(currentDataOrigin?.drivingLicenceFrontCardFileKey as string).unwrap()
          : Promise.resolve(null),
        currentDataOrigin?.drivingLicenceBackCardFileKey
          ? getUploadedPhoto(currentDataOrigin?.drivingLicenceBackCardFileKey as string).unwrap()
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
        <span>{currentDataOrigin?.drivingLicenceCategories || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Date of issue:">
        <span>{(currentDataOrigin?.drivingLicenseDateOfIssue as string) || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Expiration Date:">
        <span>{(currentDataOrigin?.drivingLicenseExpirationDate as string) || '-'}</span>
      </SharedLabel>
    </fieldset>
  );
};
