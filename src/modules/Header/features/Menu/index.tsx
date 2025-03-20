import { useMemo } from 'react';

import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { AppRoute, AppRoutes, UsageScopes } from '@global/router/routes.constans';

import './style.css';

export const Menu = (): JSX.Element => {
  const headerMenuItems: AppRoute[] = useMemo(
    () =>
      Object.values(AppRoutes).filter(
        (route: AppRoute) => route.usageScope.includes(UsageScopes.HEADER) && route.isVisible
      ),
    []
  );
  return (
    <nav className={classNames('header-navigation')}>
      <ul className={classNames('header-navigation-list')}>
        {headerMenuItems.map((route: AppRoute, index: number) => (
          <li key={index} className={classNames('header-navigation-item')}>
            <Link className={classNames('header-navigation-link')} to={route.path}>
              {route.title}
            </Link>
          </li>
        ))}
      </ul>
      <select className={classNames('header-navigation-select')} name="lang-switch">
        <option className={classNames('header-navigation-option')} value="eng">
          Eng
        </option>
        <option className={classNames('header-navigation-option')} value="pl">
          Pl
        </option>
      </select>
    </nav>
  );
};
