import classNames from 'classnames';

import DownLoadIcon from '@shared/assets/icons/DownloadIcon.svg';

import './style.css';

interface SharedImagePreviewProps {
  imageName: string;
  imageUrl: string;
}

export const SharedImagePreview = ({ imageName, imageUrl }: SharedImagePreviewProps): JSX.Element => {
  const handleDownload = async (): Promise<void> => {
    try {
      const response = await fetch(imageUrl, { credentials: 'omit' }); // качаем файл
      if (!response.ok) throw new Error('Не удалось скачать файл');
      const blob = await response.blob();

      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = imageName || 'file.png'; // 👈 именно это имя и заставит скачать
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(objectUrl);
    } catch (err) {
      console.error('Ошибка скачивания', err);
    }
  };

  return (
    <label className={classNames('shared-img-preview-container')}>
      <div className={classNames('shared-img-preview-wrapper')}>
        <img className={classNames('shared-img-preview')} src={imageUrl || ''} alt="document-photo" />
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
        onClick={handleDownload}
      />
    </label>
  );
};
