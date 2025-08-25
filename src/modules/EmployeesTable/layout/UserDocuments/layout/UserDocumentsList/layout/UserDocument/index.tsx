import React from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';
// eslint-disable-next-line import/no-named-as-default
import toast from 'react-hot-toast';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { Loader } from '@shared/components/Loader';

import IconDownload from '@shared/assets/icons/IconDownload.svg';
import IconPdf from '@shared/assets/icons/IconPdf.svg';

import './style.css';

import { useDownloadDocumentMutation } from '@global/api/pdf/pdf.api';

interface UserDocumentProps {
  fileName: string;
}
export const UserDocument = ({ fileName }: UserDocumentProps): React.ReactNode => {
  const selectedEmployee = useTypedSelector((state) => state.employeeReducer.selectedEmployee);
  const [downloadDocument, { isLoading }] = useDownloadDocumentMutation();

  const onDownloadAction = async (): Promise<void> => {
    try {
      const blob = await downloadDocument({
        userId: selectedEmployee?._id || '',
        template: 'example',
      }).unwrap();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName.toLowerCase().endsWith('.pdf')
        ? fileName
        : `${fileName}_${selectedEmployee?.personalInfo.firstName}_${selectedEmployee?.personalInfo.lastName}_${dayjs().format('DD.MM.YYYY:HH:mm')}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      toast.error('Something went wring with document downloading, try again.');
    }
  };

  return (
    <section className={classNames('user-document')}>
      <div className={classNames('user-document-icon-wrapper')}>
        <img src={IconPdf} alt="IconPdf" />
      </div>
      <div className={classNames('user-document-info')}>
        <p className={classNames('user-document-file-name')}>{fileName}</p>
      </div>
      {isLoading ? (
        <Loader width={24} height={24} />
      ) : (
        <button onClick={onDownloadAction} className="user-document-download-button">
          <img src={IconDownload} alt="Download" />
        </button>
      )}
    </section>
  );
};
