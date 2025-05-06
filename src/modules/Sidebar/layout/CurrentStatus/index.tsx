import classNames from 'classnames';

import ArrowRightIcon from '@shared/assets/icons/ArrowRightIcon.svg';

import './style.css';

export const CurrentStatus = (): JSX.Element => {
  const currentStatus = 'Empty';

  return (
    <div className={classNames('sidebar-navigation-status')}>
      {currentStatus}
      <img className={classNames('sidebar-navigation-status-icon')} src={ArrowRightIcon} alt="arrow icon" />
    </div>
  );
};
