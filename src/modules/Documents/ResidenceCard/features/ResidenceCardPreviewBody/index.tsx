import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedImagePreview } from '@shared/components/SharedImagePreview';
import { SharedLabel } from '@shared/components/SharedLabel';

import FilePreviewIcon from '@shared/assets/icons/FilePreviewIcon.svg';

import './style.css';

import { useGetUploadedPhotoUrlMutation } from '@global/api/uploadPhoto/uploadPhoto.api';
import { UserRoles } from '@shared/enums/user.enums';

export const ResidenceCardPreviewBody = (): JSX.Element => {
  const [residenceCardPhotoUrl, setResidenceCardPhotoUrl] = useState('');

  const residenceData = useTypedSelector((state) => state.userReducer.user?.documents.residenceCardDocuments);
  const selectedEmployeeResidenceData = useTypedSelector(
    (state) => state.employeeReducer.selectedEmployee?.documents.residenceCardDocuments
  );

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? residenceData : selectedEmployeeResidenceData;

  const [getUploadedPhoto] = useGetUploadedPhotoUrlMutation();

  useEffect(() => {
    const fetchResidenceCardPhoto = async (): Promise<void> => {
      if (!currentDataOrigin?.residenceCardFileKey) return;

      const { data, error } = await getUploadedPhoto(currentDataOrigin.residenceCardFileKey as string);

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
      <SharedImagePreview imageUrl={residenceCardPhotoUrl || FilePreviewIcon} imageName="Your Residence Card" />
      <SharedLabel title="Card Number:">
        <span>{currentDataOrigin?.cardNumber || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Country of Issue:">
        <span>{currentDataOrigin?.countryOfIssue || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Date of issue:">
        <span>{(currentDataOrigin?.dateOfIssue as string) || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Expiration Date:">
        <span>{(currentDataOrigin?.expirationDate as string) || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Reason for issuance:">
        <span>{currentDataOrigin?.reasonForIssuance || '-'}</span>
      </SharedLabel>
    </fieldset>
  );
};
