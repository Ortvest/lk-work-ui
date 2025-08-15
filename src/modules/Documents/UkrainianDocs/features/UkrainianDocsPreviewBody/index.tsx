import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedImagePreview } from '@shared/components/SharedImagePreview';

import FilePreviewIcon from '@shared/assets/icons/FilePreviewIcon.svg';

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

  useEffect(() => {
    const fetchResidenceCardPhoto = async (): Promise<void> => {
      if (!currentDataOrigin?.statementDocumentFileKey) return;

      const { data, error } = await getUploadedPhoto(currentDataOrigin.statementDocumentFileKey as string);

      if (error || !data) {
        console.error('Failed to fetch residence card photo URL:', error);
        return;
      }

      setUkrainianDocsPhotoUrl(data.url);
    };

    fetchResidenceCardPhoto();
  }, []);

  return (
    <fieldset className={classNames('ukrainian-docs-preview-fields-wrapper')}>
      <SharedImagePreview
        imageUrl={ukrainianDocsPhotoUrl || FilePreviewIcon}
        imageName="Your ukrainian statement document"
      />
    </fieldset>
  );
};
