import React from 'react';

import classNames from 'classnames';

import IconDownload from '@shared/assets/icons/IconDownload.svg';
import IconPdf from '@shared/assets/icons/IconPdf.svg';

import './style.css';

interface UserDocumentProps {
  fileName: string;
  fileSize: number;
}
export const UserDocument = ({ fileName, fileSize }: UserDocumentProps): React.ReactNode => {
  return (
    <section className={classNames('user-document')}>
      <div className={classNames('user-document-icon-wrapper')}>
        <img src={IconPdf} alt="IconPdf" />
      </div>
      <div className={classNames('user-document-info')}>
        <p className={classNames('user-document-file-name')}>{fileName}</p>
        <span className={classNames('user-document-file-size')}>{fileSize} KB</span>
      </div>
      <button className="user-document-download-button">
        <img src={IconDownload} alt="Download" />
      </button>
    </section>
  );
};
