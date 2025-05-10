import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedImagePreview } from '@shared/components/SharedImagePreview';
import { SharedLabel } from '@shared/components/SharedLabel';

import AlertIcon from '@shared/assets/icons/AlertIcon.svg';

import './style.css';

import { useGetUploadedPhotoUrlMutation } from '@global/api/uploadPhoto/uploadPhoto.api';

export const StudentCardPreviewBody = (): JSX.Element => {
  const [studentDocumentsPhotoUrls, setStudentDocumentsPhotoUrls] = useState({
    studentFrontCardPhotoUrl: '',
    studentBackCardPhotoUrl: '',
    studentPermitCardPhotoUrl: '',
  });
  const studentData = useTypedSelector((state) => state.userReducer.user?.documents.educationDocuments);

  const [getUploadedPhoto] = useGetUploadedPhotoUrlMutation();

  useEffect(() => {
    const getEmbassyPhotosUrl = async (): Promise<void> => {
      const [studentFrontCardPhotoResponse, studentBackCardPhotoResponse, studentPermitCardPhotoResponse] =
        await Promise.all([
          studentData?.studentFrontCardFileKey
            ? getUploadedPhoto(studentData?.studentFrontCardFileKey).unwrap()
            : Promise.resolve(null),
          studentData?.studentBackCardFileKey
            ? getUploadedPhoto(studentData?.studentBackCardFileKey).unwrap()
            : Promise.resolve(null),
          studentData?.studentPermitCardFileKey
            ? getUploadedPhoto(studentData?.studentPermitCardFileKey).unwrap()
            : Promise.resolve(null),
        ]);

      setStudentDocumentsPhotoUrls({
        studentFrontCardPhotoUrl: studentFrontCardPhotoResponse?.url ?? AlertIcon,
        studentBackCardPhotoUrl: studentBackCardPhotoResponse?.url ?? AlertIcon,
        studentPermitCardPhotoUrl: studentPermitCardPhotoResponse?.url ?? AlertIcon,
      });
    };

    getEmbassyPhotosUrl();
  }, []);

  return (
    <fieldset className={classNames('student-card-preview-fields-wrapper')}>
      <SharedImagePreview
        imageName="Student Card - Side 1"
        imageUrl={studentDocumentsPhotoUrls.studentFrontCardPhotoUrl}
      />
      <SharedImagePreview
        imageName="Student Card - Side 1"
        imageUrl={studentDocumentsPhotoUrls.studentBackCardPhotoUrl}
      />
      <SharedLabel title="Date of issue:">
        <span>{studentData?.studentStatusDate || '-'}</span>
      </SharedLabel>
      <span className={classNames('student-card-line')}></span>
      <SharedImagePreview
        imageName="Scan or Photo Statement"
        imageUrl={studentDocumentsPhotoUrls.studentPermitCardPhotoUrl}
      />
    </fieldset>
  );
};
