import React from 'react';

import classNames from 'classnames';

import { UserDocument } from '@modules/EmployeesTable/layout/UserDocuments/layout/UserDocumentsList/layout/UserDocument';


const userDocuments = [
  {
    fileName: 'Umowa 1',
    fileSize: 263,
  },
  {
    fileName: 'Umowa 2',
    fileSize: 263,
  },
  {
    fileName: 'Umowa 3',
    fileSize: 263,
  },
  {
    fileName: 'Umowa 4',
    fileSize: 263,
  },
  {
    fileName: 'Umowa 5',
    fileSize: 213,
  },
  {
    fileName: 'Umowa 6',
    fileSize: 463,
  },
  {
    fileName: 'Umowa 7',
    fileSize: 263,
  },
];

export const UserDocumentsList = (): React.ReactNode => {
  return (
    <ul className={classNames('user-documents-list')}>
      {userDocuments.map((document) => (
        <UserDocument key={document.fileName} fileName={document.fileName} fileSize={document.fileSize} />
      ))}
    </ul>
  );
};
