import { useEffect, useState } from 'react';

import classNames from 'classnames';

import { SharedImagePreview } from '@shared/components/SharedImagePreview';
import { SharedLabel } from '@shared/components/SharedLabel';

import AlertIcon from '@shared/assets/icons/AlertIcon.svg';

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
        firstPhotoUrl: firstPhotoResponse?.url ?? AlertIcon,
        seсondPhotoUrl: secondPhotoResponse?.url ?? AlertIcon,
      });
    };

    getEmbassyPhotosUrl();
  }, []);

  return (
    <fieldset className={classNames('embassy-preview-fields-wrapper')}>
      <SharedImagePreview imageUrl={embassyPhotoUrls.firstPhotoUrl} imageName="Embassy first document" />
      <SharedImagePreview imageUrl={embassyPhotoUrls.seсondPhotoUrl} imageName="Embassy second document" />
      <SharedLabel title="Date of issue:">
        <span>{embassyDateOfIssue || '-'}</span>
      </SharedLabel>
    </fieldset>
  );
};
