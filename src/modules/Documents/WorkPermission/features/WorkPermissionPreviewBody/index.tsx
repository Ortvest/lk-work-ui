import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SharedImagePreview } from '@shared/components/SharedImagePreview';
import { SharedLabel } from '@shared/components/SharedLabel';

import AlertIcon from '@shared/assets/icons/AlertIcon.svg';

import './style.css';

import { useGetUploadedPhotoUrlMutation } from '@global/api/uploadPhoto/uploadPhoto.api';

export const WorkPermissionPreviewBody = (): JSX.Element => {
  const [workPermitPhotoUrls, setWorkPermitPhotoUrls] = useState({
    workPermitDocumentPhotoUrl: '',
    workPermitPaymentDocumentPhotoUrl: '',
    workPermitApplicationPhotoUrl: '',
  });

  const workPermitData = useTypedSelector((state) => state.userReducer.user?.documents.workPermissionDocuments);

  const [getUploadedPhoto] = useGetUploadedPhotoUrlMutation();

  useEffect(() => {
    const getWorkPermitPhotosUrl = async (): Promise<void> => {
      const [permitDocRes, paymentDocRes, applicationDocRes] = await Promise.all([
        workPermitData?.workPermitDocumentFileKey
          ? getUploadedPhoto(workPermitData.workPermitDocumentFileKey).unwrap()
          : Promise.resolve(null),
        workPermitData?.workPermitPaymentDocumentFileKey
          ? getUploadedPhoto(workPermitData.workPermitPaymentDocumentFileKey).unwrap()
          : Promise.resolve(null),
        workPermitData?.workPermitApplicationFileKey
          ? getUploadedPhoto(workPermitData.workPermitApplicationFileKey).unwrap()
          : Promise.resolve(null),
      ]);

      setWorkPermitPhotoUrls({
        workPermitDocumentPhotoUrl: permitDocRes?.url ?? AlertIcon,
        workPermitPaymentDocumentPhotoUrl: paymentDocRes?.url ?? AlertIcon,
        workPermitApplicationPhotoUrl: applicationDocRes?.url ?? AlertIcon,
      });
    };

    getWorkPermitPhotosUrl();
  }, []);

  return (
    <fieldset className={classNames('work-permission-preview-fields-wrapper')}>
      <SharedImagePreview
        imageName="Scan or Photo Work Permission"
        imageUrl={workPermitPhotoUrls.workPermitDocumentPhotoUrl}
      />
      <SharedLabel title="Date of issue:">
        <span>{workPermitData?.workPermitExpirationDate || '-'}</span>
      </SharedLabel>
      <span className={classNames('work-permission-line')}></span>
      <SharedImagePreview
        imageName="Scan or Photo Payment"
        imageUrl={workPermitPhotoUrls.workPermitPaymentDocumentPhotoUrl}
      />
      <SharedImagePreview
        imageName="Scan or Photo Application"
        imageUrl={workPermitPhotoUrls.workPermitApplicationPhotoUrl}
      />
    </fieldset>
  );
};
