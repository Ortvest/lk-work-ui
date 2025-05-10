import React from 'react';

import IconArrowLeft from '@shared/assets/icons/IconArrowLeft.svg';

import './style.css';

interface UserDocumentsHeaderProps {
  setIsUserDocumentsDrawerOpen: (isOpen: boolean) => void;
}
export const UserDocumentsHeader = ({ setIsUserDocumentsDrawerOpen }: UserDocumentsHeaderProps): React.ReactNode => {
  const onClosePreview = (): void => setIsUserDocumentsDrawerOpen(false);
  return (
    <header className="user-documents-header">
      <button onClick={onClosePreview} className="user-documents-header-button">
        <img src={IconArrowLeft} alt="Back" />
      </button>
      <p className="user-documents-header-title">Print document</p>
    </header>
  );
};
