import { useMemo } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { AppRoute, AppRoutes, UsageScopes } from '@global/router/routes.constans';

import { CurrentStatus } from '@modules/Sidebar/layout/CurrentStatus';

import './style.css';

export const DocumentsNavigation = (): JSX.Element => {
  const { t } = useTranslation('employee-sidebar');
  const documentsNavigationItems: AppRoute[] = useMemo(
    () =>
      Object.values(AppRoutes).filter(
        (route: AppRoute) => route.usageScope.includes(UsageScopes.DOCUMENTS) && route.isVisible
      ),
    []
  );

  return (
    <ul className={classNames('documents-options-list')}>
      {documentsNavigationItems.map((documentRoute: AppRoute, index: number) => (
        <li className={classNames('documents-option')} key={index}>
          <NavLink className={classNames('document-link')} to={documentRoute.path}>
            {t(documentRoute.title)}
            <CurrentStatus />
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
