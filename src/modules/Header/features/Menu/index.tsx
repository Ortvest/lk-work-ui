import { useMemo, useState } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { AppRoute, AppRoutes, UsageScopes } from '@global/router/routes.constans';

import { LanguageSwitcherDropdown } from '@shared/components/LanguageSwitcherDropdown';

import './style.css';

export const Menu = (): JSX.Element => {
  const { t } = useTranslation('employee-sidebar');
  const headerMenuItems: AppRoute[] = useMemo(
    () =>
      Object.values(AppRoutes).filter(
        (route: AppRoute) => route.usageScope.includes(UsageScopes.HEADER) && route.isVisible
      ),
    []
  );

  const [isSupportModalVisible, setIsSupportModalVisible] = useState(false);

  return (
    <nav className={classNames('header-navigation')}>
      <ul
        className={classNames('header-navigation-list')}
        onClick={() => setIsSupportModalVisible(!isSupportModalVisible)}>
        {headerMenuItems.map((route: AppRoute, index: number) => (
          <li key={index} className={classNames('header-navigation-item')}>
            <button className={classNames('header-navigation-button')}>{t(route.title)}</button>
          </li>
        ))}
        {isSupportModalVisible ? (
          <div className="support-modal">
            <h4 className="support-modal-title">{t('routeSupport')}</h4>
            <p className="support-modal-text">
              {t('headerSupportText')} <span>+123123123</span>
            </p>
          </div>
        ) : null}
      </ul>
      <LanguageSwitcherDropdown />
    </nav>
  );
};
