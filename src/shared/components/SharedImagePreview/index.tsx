import { Fragment, useState } from 'react';

import classNames from 'classnames';

import DownLoadIcon from '@shared/assets/icons/DownloadIcon.svg';
import FilePreviewIcon from '@shared/assets/icons/FilePreviewIcon.svg';

import './style.css';

interface SharedImagePreviewProps {
  imageName: string;
  imageUrl: string;
}

export const SharedImagePreview = ({ imageName, imageUrl }: SharedImagePreviewProps): JSX.Element => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleDownload = async (): Promise<void> => {
    try {
      const response = await fetch(imageUrl, { credentials: 'omit' });
      if (!response.ok) throw new Error('Unable to download file');
      const blob = await response.blob();

      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = imageName || 'file.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(objectUrl);
    } catch (err) {
      console.error('Download error', err);
    }
  };

  return (
    <Fragment>
      <label className={classNames('shared-img-preview-container')}>
        {imageUrl ? (
          <div className={classNames('shared-img-preview-wrapper')} onClick={() => imageUrl && setIsPreviewOpen(true)}>
            <img className={classNames('shared-img-preview')} src={imageUrl} alt="document-photo" />
          </div>
        ) : (
          <div className={classNames('shared-img-preview-wrapper')}>
            <img className={classNames('shared-img-preview')} src={FilePreviewIcon} alt="document-photo" />
          </div>
        )}

        <div className={classNames('shared-img-preview-name-wrapper')}>
          <p className={classNames('shared-img-preview-name')}>{imageName}</p>
          <p className={classNames('shared-img-preview-size')}>
            Size: {imageUrl ? (imageUrl.length / 1024).toFixed(2) + ' Mb' : '-'}
          </p>
        </div>
        <img
          className={classNames('shared-img-preview-download-icon')}
          src={DownLoadIcon}
          alt="download-icon"
          onClick={handleDownload}
        />
      </label>

      {isPreviewOpen && (
        <div className="shared-img-lightbox" onClick={() => setIsPreviewOpen(false)}>
          <img className="shared-img-lightbox-img" src={imageUrl} alt={imageName} />
        </div>
      )}
    </Fragment>
  );
};
