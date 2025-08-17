import classNames from 'classnames';
import DownLoadIcon from '@shared/assets/icons/DownloadIcon.svg';
import './style.css';

interface SharedImagePreviewProps {
  imageName: string;
  imageUrl: string;
}

export const SharedImagePreview = ({ imageName, imageUrl }: SharedImagePreviewProps): JSX.Element => {

  return (
    <label className={classNames('shared-img-preview-container')}>
      <div className={classNames('shared-img-preview-wrapper')}>
        <img
          className={classNames('shared-img-preview')}
          src={imageUrl || ''}
          alt="document-photo"
        />
      </div>
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
        onClick={(e) => {
          e.stopPropagation();
          window.open(imageUrl, '_blank');
        }}
      />
    </label>
  );
};
