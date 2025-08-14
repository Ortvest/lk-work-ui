import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedImagePreview } from '@shared/components/SharedImagePreview';
import { SharedLabel } from '@shared/components/SharedLabel';

import FilePreviewIcon from '@shared/assets/icons/FilePreviewIcon.svg';

import './style.css';

import { useGetUploadedPhotoUrlMutation } from '@global/api/uploadPhoto/uploadPhoto.api';
import { UserRoles } from '@shared/enums/user.enums';

export const WorkPermissionPreviewBody = (): JSX.Element => {
  const [workPermitPhotoUrls, setWorkPermitPhotoUrls] = useState({
    workPermitDocumentPhotoUrl: '',
    workPermitPaymentDocumentPhotoUrl: '',
    workPermitApplicationPhotoUrl: '',
  });

  const workPermitData = useTypedSelector((state) => state.userReducer.user?.documents.workPermissionDocuments);
  const selectedEmployeeWorkPermitData = useTypedSelector(
    (state) => state.employeeReducer.selectedEmployee?.documents.workPermissionDocuments
  );

  const userRole = useTypedSelector((state) => state.userReducer.user?.role);
  const currentDataOrigin = userRole === UserRoles.EMPLOYEE ? workPermitData : selectedEmployeeWorkPermitData;

  const [getUploadedPhoto] = useGetUploadedPhotoUrlMutation();

  useEffect(() => {
    const getWorkPermitPhotosUrl = async (): Promise<void> => {
      const [permitDocRes, paymentDocRes, applicationDocRes] = await Promise.all([
        currentDataOrigin?.workPermitDocumentFileKey
          ? getUploadedPhoto(currentDataOrigin.workPermitDocumentFileKey as string).unwrap()
          : Promise.resolve(null),
        currentDataOrigin?.workPermitPaymentDocumentFileKey
          ? getUploadedPhoto(currentDataOrigin.workPermitPaymentDocumentFileKey as string).unwrap()
          : Promise.resolve(null),
        currentDataOrigin?.workPermitApplicationFileKey
          ? getUploadedPhoto(currentDataOrigin.workPermitApplicationFileKey as string).unwrap()
          : Promise.resolve(null),
      ]);

      setWorkPermitPhotoUrls({
        workPermitDocumentPhotoUrl: permitDocRes?.url ?? FilePreviewIcon,
        workPermitPaymentDocumentPhotoUrl: paymentDocRes?.url ?? FilePreviewIcon,
        workPermitApplicationPhotoUrl: applicationDocRes?.url ?? FilePreviewIcon,
      });
    };

    getWorkPermitPhotosUrl();
  }, []);

  return (
    <fieldset className={classNames('work-permission-preview-fields-wrapper')}>
      <SharedImagePreview
        imageName="Scan or Photo Work Permission"
        imageUrl={workPermitPhotoUrls.workPermitDocumentPhotoUrl || FilePreviewIcon}
      />
      <SharedLabel title="Date of issue:">
        <span>{(currentDataOrigin?.workPermitExpirationDate as string) || '-'}</span>
      </SharedLabel>
      <span className={classNames('work-permission-line')}></span>
      <SharedImagePreview
        imageName="Scan or Photo Payment"
        imageUrl={workPermitPhotoUrls.workPermitPaymentDocumentPhotoUrl || FilePreviewIcon}
      />
      <SharedImagePreview
        imageName="Scan or Photo Application"
        imageUrl={workPermitPhotoUrls.workPermitApplicationPhotoUrl || FilePreviewIcon}
      />
    </fieldset>
  );
};
