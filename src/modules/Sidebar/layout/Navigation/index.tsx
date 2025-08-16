import { useMemo } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { AppRoute, AppRoutes, UsageScopes } from '@global/router/routes.constans';

import { CurrentStatus } from '@modules/Sidebar/layout/CurrentStatus';
import { DocumentsNavigation } from '@modules/Sidebar/layout/DocumentsNavigation';

import DocumentsIcon from '@shared/assets/icons/DocumentsIcon.svg';

import './style.css';

export const Navigation = (): JSX.Element => {
  const location = useLocation();
  const { t } = useTranslation('employee-sidebar');
  const currentPathname = location.pathname;

  const sidebarNavigationItems: AppRoute[] = useMemo(
    () =>
      Object.values(AppRoutes).filter(
        (route: AppRoute) => route.usageScope.includes(UsageScopes.SIDEBAR) && route.isVisible
      ),
    []
  );

  const isDocumentsSectionActive = currentPathname.startsWith(AppRoutes.DOCUMENTS.path);

  return (
    <ul className={classNames('sidebar-navigation-list')}>
      {sidebarNavigationItems.map((route: AppRoute, index: number) => (
        <li key={index} className={classNames('sidebar-navigation-item')}>
          <Link
            className={classNames('sidebar-navigation-link', {
              active: currentPathname === route.path,
            })}
            to={route.path}>
            <img className={classNames('sidebar-navigation-icon')} src={route.icon} alt="route icon" />
            {t(route.title)}
          </Link>
          <CurrentStatus />
        </li>
      ))}

      <li className={classNames('sidebar-navigation-item')}>
        <Link
          className={classNames('sidebar-navigation-link', {
            active: isDocumentsSectionActive,
          })}
          to={AppRoutes.PASSPORT.path}>
          <img className={classNames('sidebar-navigation-icon')} src={DocumentsIcon} alt="route icon" />
          {t('routeDocuments')}
        </Link>
        <CurrentStatus />
      </li>
      {isDocumentsSectionActive ? <DocumentsNavigation /> : null}
    </ul>
  );
};
