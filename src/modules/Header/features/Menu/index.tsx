import { useMemo } from 'react';

import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { AppRoute, AppRoutes, UsageScopes } from '@global/router/routes.constans';

import './style.css';
import { availableLanguages } from '@global/i18n/languages';
import { useTranslation } from "react-i18next";

export const Menu = (): JSX.Element => {
  const {t} = useTranslation('employee-sidebar')
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
              {t(route.title)}
            </Link>
          </li>
        ))}
      </ul>
      <select
        className={classNames('header-navigation-select')}
        name="lang-switch"
      >
        {
          availableLanguages.map(((lang: { code: string; label: string }) => (
          <option
            key={lang.code}
            className={classNames('header-navigation-option')}
            value={lang.code}
          >
            {lang.label}
          </option>
        )))}
      </select>
    </nav>
  );
};
