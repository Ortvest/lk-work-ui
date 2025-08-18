import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedImagePreview } from '@shared/components/SharedImagePreview';
import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

import { useGetUploadedPhotoUrlMutation } from '@global/api/uploadPhoto/uploadPhoto.api';
import { UserRoles } from '@shared/enums/user.enums';

export const PassportPreviewBody = (): JSX.Element => {
  const [passportPreviewPhoto, setPassportPreviewPhoto] = useState('');
  const { t } = useTranslation('employee-sidebar');

  const passportData = useTypedSelector((state) => state.userReducer.user?.documents.passportDocuments);
  const selectedEmployeePassportDocumentsData = useTypedSelector(
    (state) => state.employeeReducer.selectedEmployee?.documents.passportDocuments
  );

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? passportData : selectedEmployeePassportDocumentsData;

  const [getUploadedPhoto] = useGetUploadedPhotoUrlMutation();

  useEffect(() => {
    const getPassportPhotoUrl = async (): Promise<void> => {
      if (!currentDataOrigin?.passportFileKey) return;

      const { data, error } = await getUploadedPhoto(currentDataOrigin.passportFileKey as string);

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
      <SharedImagePreview imageUrl={passportPreviewPhoto} imageName={t('passportInformation')} />
      <SharedLabel title={t('passportNumber')}>
        <span>{currentDataOrigin?.passportNumber || '-'}</span>
      </SharedLabel>
      <SharedLabel title={t('passportDateOfIssue')}>
        <span>{(currentDataOrigin?.passportDateOfIssue as string) || '-'}</span>
      </SharedLabel>
      <SharedLabel title={t('passportExpirationDate')}>
        <span>{(currentDataOrigin?.passportExpirationDate as string) || '-'}</span>
      </SharedLabel>
    </fieldset>
  );
};
