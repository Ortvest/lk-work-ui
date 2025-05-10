import { forwardRef, Fragment, useState } from 'react';

import classNames from 'classnames';

import FileIcon from '@shared/assets/icons/FileIcon.svg';
import VerticalDotsIcon from '@shared/assets/icons/VerticalDotsIcon.svg';

import './style.css';

type SharedFileUploadProps = {
  title?: string;
  onChange?: (file: File) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>;

export const SharedFileUpload = forwardRef<HTMLInputElement, SharedFileUploadProps>(
  ({ title = 'Add a Scan or Photo Document', onChange, ...props }, ref) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [fileInfo, setFileInfo] = useState<{ name: string; size: string } | null>(null);

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
      const file = event.target.files?.[0];
      if (file) {
        if (file.type.startsWith('image/')) {
          setPreview(URL.createObjectURL(file));
        } else {
          setPreview(null);
        }

        setFileInfo({
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(1)} Mb`,
        });

        onChange?.(file);
      }
    };

    return (
      <label className={classNames('shared-file-label', preview && fileInfo && 'shared-file-label-with-preview')}>
        <input
          ref={ref}
          className={classNames('shared-file-input')}
          type="file"
          accept="image/*,application/pdf"
          onChange={onChangeHandler}
          {...props}
        />

        {preview && fileInfo ? (
          <div className={classNames('shared-file-preview-container')}>
            <img className={classNames('shared-file-preview')} src={preview} alt={fileInfo.name} />
            <div className={classNames('shared-file-info')}>
              <span className={classNames('shared-file-name')}>{fileInfo.name}</span>
              <span className={classNames('shared-file-size')}>{fileInfo.size}</span>
            </div>
            <img className={classNames('shared-file-options')} src={VerticalDotsIcon} alt="options" />
          </div>
        ) : (
          <Fragment>
            <img className={classNames('shared-file-icon')} src={FileIcon} alt="file-icon" />
            <h3 className={classNames('shared-file-title')}>{title}</h3>
            <p className={classNames('shared-file-subtitle')}>
              You can add a document in the following formats: .pdf, .png, .jpg — optimal file size 5–7 MB
            </p>
          </Fragment>
        )}
      </label>
    );
  }
);

SharedFileUpload.displayName = 'SharedFileUpload';
