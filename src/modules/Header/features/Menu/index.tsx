import { useMemo } from 'react';

import classNames from 'classnames';
import { Link, useNavigate } from 'react-router-dom';

import { UserSlice } from '@global/store/slices/User.slice';

import { AppRoute, AppRoutes, UsageScopes } from '@global/router/routes.constans';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';

import './style.css';

export const Menu = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const { setUserAuthStatus, setUserAdminStatus } = UserSlice.actions;
  const headerMenuItems: AppRoute[] = useMemo(
    () =>
      Object.values(AppRoutes).filter(
        (route: AppRoute) => route.usageScope.includes(UsageScopes.HEADER) && route.isVisible
      ),
    []
  );

  const onLogoutHanlder = (): void => {
    localStorage.clear();
    dispatch(setUserAuthStatus(false));
    dispatch(setUserAdminStatus(false));
    navigate('/');
  };
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
        <li className={classNames('header-navigation-item')} onClick={onLogoutHanlder}>
          Logout
        </li>
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
