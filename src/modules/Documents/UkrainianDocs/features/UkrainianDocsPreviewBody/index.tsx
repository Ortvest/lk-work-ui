import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedImagePreview } from '@shared/components/SharedImagePreview';

import './style.css';

import { useGetUploadedPhotoUrlMutation } from '@global/api/uploadPhoto/uploadPhoto.api';
import { UserRoles } from '@shared/enums/user.enums';

export const UkrainianDocsPreviewBody = (): JSX.Element => {
  const [ukrainianDocsPhotoUrl, setUkrainianDocsPhotoUrl] = useState('');

  const ukrainianDocs = useTypedSelector((state) => state.userReducer.user?.documents.ukrainianStatementDocument);
  const selectedEmployeeUkrainianDocs = useTypedSelector(
    (state) => state.employeeReducer.selectedEmployee?.documents.ukrainianStatementDocument
  );

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? ukrainianDocs : selectedEmployeeUkrainianDocs;

  const [getUploadedPhoto] = useGetUploadedPhotoUrlMutation();
  const { t } = useTranslation('employee-sidebar');

  useEffect(() => {
    const fetchUkrainianDocsPhoto = async (): Promise<void> => {
      if (!currentDataOrigin?.statementDocumentFileKey) return;

      const { data, error } = await getUploadedPhoto(currentDataOrigin.statementDocumentFileKey as string);

      if (error || !data) {
        console.error('Failed to fetch ukrainian docs photo URL:', error);
        return;
      }

      setUkrainianDocsPhotoUrl(data.url);
    };

    fetchUkrainianDocsPhoto();
  }, []);

  return (
    <fieldset className={classNames('ukrainian-docs-preview-fields-wrapper')}>
      <SharedImagePreview imageUrl={ukrainianDocsPhotoUrl} imageName={t('ukrainianStatementFile')} />
    </fieldset>
  );
};
