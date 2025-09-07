import classNames from 'classnames';

import ArrowRightIcon from '@shared/assets/icons/ArrowRightIcon.svg';

import './style.css';

export const CurrentStatus = (): JSX.Element => {
  return (
    <div className={classNames('sidebar-navigation-status')}>
      <img className={classNames('sidebar-navigation-status-icon')} src={ArrowRightIcon} alt="arrow icon" />
    </div>
  );
};
