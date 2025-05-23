import React from 'react';

import classNames from 'classnames';

import { DataWrapper } from '@modules/EmployeesTable/layout/UserPreview/layout/DataWrapper';

import { useDayjs } from '@shared/hooks/useDayjs';

import IconUser from '@shared/assets/icons/IconUser.svg';

import './style.css';

import { UserDocumentsStatus } from '@shared/enums/user.enums';

interface UserPreviewPersonalDataProps {
  documentStatus: UserDocumentsStatus;
  fullName: string;
  dateOfBirth: string;
  nationality: string;
  avatarUrl: string;
}
export const UserPreviewPersonalData = ({
  documentStatus,
  fullName,
  nationality,
  dateOfBirth,
  avatarUrl,
}: UserPreviewPersonalDataProps): React.ReactNode => {
  const dayjs = useDayjs();
  const age = dayjs().diff(dayjs(dateOfBirth, 'DD-MM-YYYY'), 'year');
  return (
    <DataWrapper isFirstChild={true}>
      <header className={classNames('user-preview-personal-data-header')}>
        <div>
          <p>Status: </p>
        </div>
        <div>
          <p>{documentStatus}</p>
        </div>
      </header>
      <main className={classNames('user-preview-personal-data-content')}>
        <section className={classNames('user-preview-avatar', { 'has-background': !avatarUrl })}>
          <img src={avatarUrl ? avatarUrl : IconUser} alt="user avatar" />
        </section>
        <section>
          <div>
            <p className={classNames('user-preview-personal-data-full-name')}>{fullName}</p>
          </div>
          <div>
            <span className={classNames('user-preview-personal-data-meta-info')}>
              {age}, {nationality}
            </span>
          </div>
        </section>
      </main>
    </DataWrapper>
  );
};
