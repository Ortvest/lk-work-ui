import { useMemo, useState } from 'react';

import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { AppRoute, AppRoutes, UsageScopes } from '@global/router/routes.constans';

import { CurrentStatus } from '@modules/Sidebar/layout/CurrentStatus';
import { DocumentsNavigation } from '@modules/Sidebar/layout/DocumentsNavigation';

import DocumentsIcon from '@shared/assets/icons/DocumentsIcon.svg';

import './style.css';

export const Navigation = (): JSX.Element => {
  const currentPathname = window.location.pathname;
  const [activeRoute, setActiveRoute] = useState<string | null>(currentPathname);

  const onRouteChangeHanlder = (selectedRoute: string): void => {
    setActiveRoute(selectedRoute);
  };

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
          <Link
            className={classNames('sidebar-navigation-link', {
              active: activeRoute === route.path,
            })}
            to={route.path}
            onClick={() => onRouteChangeHanlder(route.path)}>
            <img className={classNames('sidebar-navigation-icon')} src={route.icon} alt="route icon" />
            {route.title}
          </Link>
          <CurrentStatus />
        </li>
      ))}
      <li className={classNames('sidebar-navigation-item')}>
        <a
          className={classNames('sidebar-navigation-link', {
            active: activeRoute === AppRoutes.DOCUMENTS.path,
          })}
          onClick={() => onRouteChangeHanlder('documents')}>
          <img className={classNames('sidebar-navigation-icon')} src={DocumentsIcon} alt="route icon" />
          Documents
        </a>
        <CurrentStatus />
      </li>
      {activeRoute === AppRoutes.DOCUMENTS.path ? <DocumentsNavigation /> : null}
    </ul>
  );
};
