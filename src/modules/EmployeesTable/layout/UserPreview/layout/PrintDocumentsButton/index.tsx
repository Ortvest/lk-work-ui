import React from 'react';

import classNames from 'classnames';

import IconPrint from '@shared/assets/icons/IconPrint.svg';

import './style.css';

interface PrintDocumentsButtonProps {
  setIsUserDocumentsDrawerOpen: (isOpen: boolean) => void;
}
export const PrintDocumentsButton = ({ setIsUserDocumentsDrawerOpen }: PrintDocumentsButtonProps): React.ReactNode => {
  const onOpenUserDocuments = (): void => setIsUserDocumentsDrawerOpen(true);
  return (
    <button onClick={onOpenUserDocuments} className={classNames('print-documents-button')}>
      <img src={IconPrint} alt="IconPrint" />
      <span>Print document</span>
    </button>
  );
};
