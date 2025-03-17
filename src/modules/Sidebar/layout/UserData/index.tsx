import classNames from 'classnames';

import DotsIcon from '@shared/assets/icons/DotsIcon.svg';
import UserIcon from '@shared/assets/icons/UserIcon.svg';

import './style.css';

export const UserData = (): JSX.Element => {
  return (
    <article className={classNames('user-data')}>
      <div className={classNames('user-avatar')}>
        <img src={UserIcon} alt="user-icon" />
      </div>
      <div className={classNames('user-data-values')}>
        <div className={classNames('user-name')}>Ivan B.</div>
        <div className={classNames('user-email')}>usermail@mail.com</div>
      </div>
      <button className={classNames('user-options')}>
        <img src={DotsIcon} alt="options-icon" />
      </button>
    </article>
  );
};
