import { forwardRef } from 'react';

import classNames from 'classnames';

import FileIcon from '@shared/assets/icons/FileIcon.svg';

import './style.css';

type SharedFileUploadProps = {
  title?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const SharedFileUpload = forwardRef<HTMLInputElement, SharedFileUploadProps>(
  ({ title = 'Add a Scan or Photo Document', ...props }, ref) => {
    return (
      <label className={classNames('shared-file-label')}>
        <input ref={ref} className={classNames('shared-file-input')} type="file" {...props} />
        <img className={classNames('shared-file-icon')} src={FileIcon} alt="file-icon" />
        <h3 className={classNames('shared-file-title')}>{title || 'Add a Scan or Photo Document'}</h3>
        <p className={classNames('shared-file-subtitle')}>
          You can add a document in the following formats: .pdf, .png, .jpg — optimal file size 5–7 MB
        </p>
      </label>
    );
  }
);

SharedFileUpload.displayName = 'SharedFileUpload';
