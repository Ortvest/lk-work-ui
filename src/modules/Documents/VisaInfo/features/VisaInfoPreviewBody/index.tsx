import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedImagePreview } from '@shared/components/SharedImagePreview';
import { SharedLabel } from '@shared/components/SharedLabel';

import AlertIcon from '@shared/assets/icons/AlertIcon.svg';

import './style.css';

import { useGetUploadedPhotoUrlMutation } from '@global/api/uploadPhoto/uploadPhoto.api';
import { UserRoles } from '@shared/enums/user.enums';

export const VisaInfoPreviewBody = (): JSX.Element => {
  const [visaPreviewPhoto, setVisaPreviewPhoto] = useState('');

  const visaData = useTypedSelector((state) => state.userReducer.user?.documents.visaInformationDocuments);
  const selectedEmployeeVisaData = useTypedSelector(
    (state) => state.employeeReducer.selectedEmployee?.documents.visaInformationDocuments
  );

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? visaData : selectedEmployeeVisaData;

  const [getUploadedPhoto] = useGetUploadedPhotoUrlMutation();

  useEffect(() => {
    const fetchVisaPhoto = async (): Promise<void> => {
      if (!currentDataOrigin?.visaDocumentFileKey) return;

      const { data, error } = await getUploadedPhoto(currentDataOrigin.visaDocumentFileKey as string);

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
        <span>{currentDataOrigin?.visaType || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Date of issue:">
        <span>{(currentDataOrigin?.dateOfIssue as string) || '-'}</span>
      </SharedLabel>
      <SharedLabel title="Expiration Date:">
        <span>{(currentDataOrigin?.expirationDate as string) || '-'}</span>
      </SharedLabel>
    </fieldset>
  );
};
