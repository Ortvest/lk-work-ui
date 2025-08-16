import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedImagePreview } from '@shared/components/SharedImagePreview';
import { SharedLabel } from '@shared/components/SharedLabel';

import FilePreviewIcon from '@shared/assets/icons/FilePreviewIcon.svg';

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
  const { t } = useTranslation('employee-sidebar');

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
      <SharedImagePreview imageUrl={visaPreviewPhoto || FilePreviewIcon} imageName={t('visaInfoFile')} />
      <SharedLabel title={t('visaInfoType')}>
        <span>{currentDataOrigin?.visaType || '-'}</span>
      </SharedLabel>
      <SharedLabel title={t('visaInfoDateOfIssue')}>
        <span>{(currentDataOrigin?.dateOfIssue as string) || '-'}</span>
      </SharedLabel>
      <SharedLabel title={t('visaInfoExpirationDate')}>
        <span>{(currentDataOrigin?.expirationDate as string) || '-'}</span>
      </SharedLabel>
    </fieldset>
  );
};
