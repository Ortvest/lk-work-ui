import React from 'react';

import classNames from 'classnames';

import { UserDocumentsHeader } from '@modules/EmployeesTable/layout/UserDocuments/layout/UserDocumentsHeader';
import { UserDocumentsList } from '@modules/EmployeesTable/layout/UserDocuments/layout/UserDocumentsList';

import './style.css';

interface UserDocumentsProps {
  setIsUserDocumentsDrawerOpen: (isOpen: boolean) => void;
}

export const UserDocuments = ({ setIsUserDocumentsDrawerOpen }: UserDocumentsProps): React.ReactNode => {
  const onCancelHandler = (): void => setIsUserDocumentsDrawerOpen(false);
  return (
    <section>
      <UserDocumentsHeader setIsUserDocumentsDrawerOpen={setIsUserDocumentsDrawerOpen} />
      <UserDocumentsList />
      <div className={classNames('user-documents-button-wrapper')}>
        <button className={classNames('user-documents-button')} onClick={onCancelHandler}>
          Cancel
        </button>
      </div>
    </section>
  );
};
