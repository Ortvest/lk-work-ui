import classNames from 'classnames';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import DotsIcon from '@shared/assets/icons/DotsIcon.svg';
import UserIcon from '@shared/assets/icons/UserIcon.svg';

import './style.css';

export const UserData = (): JSX.Element => {
  const personalInfo = useTypedSelector((state) => state.userReducer.user?.personalInfo);

  return (
    <article className={classNames('user-data')}>
      <div className={classNames('user-avatar')}>
        <img src={UserIcon} alt="user-icon" />
      </div>
      <div className={classNames('user-data-values')}>
        <div className={classNames('user-name')}>
          {personalInfo?.firstName || ''} {personalInfo?.lastName || ''}
        </div>
        <div className={classNames('user-email')}>{personalInfo?.email || '-'}</div>
      </div>
      <button className={classNames('user-options')}>
        <img src={DotsIcon} alt="options-icon" />
      </button>
    </article>
  );
};
