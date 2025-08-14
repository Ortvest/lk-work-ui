import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedImagePreview } from '@shared/components/SharedImagePreview';
import { SharedLabel } from '@shared/components/SharedLabel';

import FilePreviewIcon from '@shared/assets/icons/FilePreviewIcon.svg';

import './style.css';

import { useGetUploadedPhotoUrlMutation } from '@global/api/uploadPhoto/uploadPhoto.api';
import { UserRoles } from '@shared/enums/user.enums';

export const StudentCardPreviewBody = (): JSX.Element => {
  const [studentDocumentsPhotoUrls, setStudentDocumentsPhotoUrls] = useState({
    studentFrontCardPhotoUrl: '',
    studentBackCardPhotoUrl: '',
    studentPermitCardPhotoUrl: '',
  });
  const studentData = useTypedSelector((state) => state.userReducer.user?.documents.educationDocuments);
  const selectedEmployeeStudentData = useTypedSelector(
    (state) => state.employeeReducer.selectedEmployee?.documents.educationDocuments
  );

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? studentData : selectedEmployeeStudentData;
  const [getUploadedPhoto] = useGetUploadedPhotoUrlMutation();

  useEffect(() => {
    const getEmbassyPhotosUrl = async (): Promise<void> => {
      const [studentFrontCardPhotoResponse, studentBackCardPhotoResponse, studentPermitCardPhotoResponse] =
        await Promise.all([
          currentDataOrigin?.studentFrontCardFileKey
            ? getUploadedPhoto(currentDataOrigin?.studentFrontCardFileKey as string).unwrap()
            : Promise.resolve(null),
          currentDataOrigin?.studentBackCardFileKey
            ? getUploadedPhoto(currentDataOrigin?.studentBackCardFileKey as string).unwrap()
            : Promise.resolve(null),
          currentDataOrigin?.studentPermitCardFileKey
            ? getUploadedPhoto(currentDataOrigin?.studentPermitCardFileKey as string).unwrap()
            : Promise.resolve(null),
        ]);

      setStudentDocumentsPhotoUrls({
        studentFrontCardPhotoUrl: studentFrontCardPhotoResponse?.url ?? FilePreviewIcon,
        studentBackCardPhotoUrl: studentBackCardPhotoResponse?.url ?? FilePreviewIcon,
        studentPermitCardPhotoUrl: studentPermitCardPhotoResponse?.url ?? FilePreviewIcon,
      });
    };

    getEmbassyPhotosUrl();
  }, []);

  return (
    <fieldset className={classNames('student-card-preview-fields-wrapper')}>
      <SharedImagePreview
        imageName="Student Card - Side 1"
        imageUrl={studentDocumentsPhotoUrls.studentFrontCardPhotoUrl || FilePreviewIcon}
      />
      <SharedImagePreview
        imageName="Student Card - Side 1"
        imageUrl={studentDocumentsPhotoUrls.studentBackCardPhotoUrl || FilePreviewIcon}
      />
      <SharedLabel title="Date of issue:">
        <span>{(currentDataOrigin?.studentStatusDate as string) || '-'}</span>
      </SharedLabel>
      <span className={classNames('student-card-line')}></span>
      <SharedImagePreview
        imageName="Scan or Photo Statement"
        imageUrl={studentDocumentsPhotoUrls.studentPermitCardPhotoUrl || FilePreviewIcon}
      />
    </fieldset>
  );
};
