import { useMemo } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { CommonSlice } from '@global/store/slices/Common.slice';

import { AppRoute, AppRoutes, UsageScopes } from '@global/router/routes.constans';

import { CurrentStatus } from '@modules/Sidebar/layout/CurrentStatus';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';

import './style.css';

export const DocumentsNavigation = (): JSX.Element => {
  const { t } = useTranslation('employee-sidebar');
  const dispatch = useTypedDispatch();
  const { setIsEditModeEnabled, setIsSidebarVisible } = CommonSlice.actions;
  const documentsNavigationItems: AppRoute[] = useMemo(
    () =>
      Object.values(AppRoutes).filter(
        (route: AppRoute) => route.usageScope.includes(UsageScopes.DOCUMENTS) && route.isVisible
      ),
    []
  );

  const onRouteChangeHandler = (): void => {
    dispatch(setIsEditModeEnabled(false));
    dispatch(setIsSidebarVisible(false));
  };

  return (
    <ul className={classNames('documents-options-list')}>
      {documentsNavigationItems.map((documentRoute: AppRoute, index: number) => (
        <li className={classNames('documents-option')} key={index}>
          <NavLink className={classNames('document-link')} to={documentRoute.path} onClick={onRouteChangeHandler}>
            {t(documentRoute.title)}
            <CurrentStatus />
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
