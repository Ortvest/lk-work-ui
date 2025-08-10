import React from 'react';

import classNames from 'classnames';

import { UserDocument } from '@modules/EmployeesTable/layout/UserDocuments/layout/UserDocumentsList/layout/UserDocument';

const userDocuments = [
  {
    fileName: 'Umowa',
  },
];

export const UserDocumentsList = (): React.ReactNode => {
  return (
    <ul className={classNames('user-documents-list')}>
      {userDocuments.map((document) => (
        <UserDocument key={document.fileName} fileName={document.fileName} />
      ))}
    </ul>
  );
};
