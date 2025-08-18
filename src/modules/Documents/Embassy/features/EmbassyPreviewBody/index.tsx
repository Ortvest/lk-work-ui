import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { SharedImagePreview } from '@shared/components/SharedImagePreview';
import { SharedLabel } from '@shared/components/SharedLabel';

import './style.css';

import { useGetUploadedPhotoUrlMutation } from '@global/api/uploadPhoto/uploadPhoto.api';

interface EmbassyPreviewBodyProps {
  embassyFirstDocumentFileKey: string;
  embassySecondDocumentFileKey: string;
  embassyDateOfIssue: string;
}

export const EmbassyPreviewBody = ({
  embassyFirstDocumentFileKey,
  embassySecondDocumentFileKey,
  embassyDateOfIssue,
}: EmbassyPreviewBodyProps): JSX.Element => {
  const { t } = useTranslation('employee-sidebar');
  const [embassyPhotoUrls, setEmbassyPhotoUrls] = useState({
    firstPhotoUrl: '',
    seсondPhotoUrl: '',
  });

  const [getUploadedPhoto] = useGetUploadedPhotoUrlMutation();

  useEffect(() => {
    const getEmbassyPhotosUrl = async (): Promise<void> => {
      const [firstPhotoResponse, secondPhotoResponse] = await Promise.all([
        embassyFirstDocumentFileKey ? getUploadedPhoto(embassyFirstDocumentFileKey).unwrap() : Promise.resolve(null),
        embassySecondDocumentFileKey ? getUploadedPhoto(embassySecondDocumentFileKey).unwrap() : Promise.resolve(null),
      ]);

      setEmbassyPhotoUrls({
        firstPhotoUrl: firstPhotoResponse?.url || '',
        seсondPhotoUrl: secondPhotoResponse?.url || '',
      });
    };

    getEmbassyPhotosUrl();
  }, []);

  return (
    <fieldset className={classNames('embassy-preview-fields-wrapper')}>
      <SharedImagePreview imageUrl={embassyPhotoUrls.firstPhotoUrl} imageName={t('embassyFirstDocument')} />
      <SharedImagePreview imageUrl={embassyPhotoUrls.seсondPhotoUrl} imageName={t('embassySecondDocument')} />
      <SharedLabel title={t('dateOfIssue')}>
        <span>{embassyDateOfIssue || '-'}</span>
      </SharedLabel>
    </fieldset>
  );
};
