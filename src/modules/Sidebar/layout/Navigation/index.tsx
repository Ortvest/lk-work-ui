import { useMemo } from 'react';

import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

import { AppRoute, AppRoutes, UsageScopes } from '@global/router/router.constans';

import ArrowRightIcon from '@shared/assets/icons/ArrowRightIcon.svg';

import './style.css';

export const Navigation = (): JSX.Element => {
  const currentStatus = 'Empty';

  const sidebarNavigationItems: AppRoute[] = useMemo(
    () =>
      Object.values(AppRoutes).filter(
        (route: AppRoute) => route.usageScope.includes(UsageScopes.SIDEBAR) && route.isVisible
      ),
    []
  );

  return (
    <ul className={classNames('sidebar-navigation-list')}>
      {sidebarNavigationItems.map((route: AppRoute, index: number) => (
        <li key={index} className={classNames('sidebar-navigation-item')}>
          <NavLink className={classNames('sidebar-navigation-link')} to={route.path}>
            <img className={classNames('sidebar-navigation-icon')} src={route.icon} alt="route icon" />
            {route.title}
          </NavLink>
          <div className={classNames('sidebar-navigation-status')}>
            {currentStatus}
            <img className={classNames('sidebar-navigation-status-icon')} src={ArrowRightIcon} alt="arrow icon" />
          </div>
        </li>
      ))}
    </ul>
  );
};
