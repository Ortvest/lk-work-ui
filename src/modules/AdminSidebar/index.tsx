import { useMemo, useState } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { AppRoutes } from '@global/router/routes.constans';

import { AdminSidebarItem } from '@modules/AdminSidebar/layout/Item';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { LanguageSwitcherDropdown } from '@shared/components/LanguageSwitcherDropdown';

import IconEmployees from '@shared/assets/icons/IconEmployees.svg';
import IconEmployeesWhite from '@shared/assets/icons/IconEmployeesWhite.svg';
import IconGlobe from '@shared/assets/icons/IconGlobe.svg';
import IconHome from '@shared/assets/icons/IconHome.svg';
import IconUser from '@shared/assets/icons/IconUser.svg';
import IconUserProfile from '@shared/assets/icons/IconUserProfile.svg';
import IconUserProfileWhite from '@shared/assets/icons/IconUserProfileWhite.svg';

import './style.css';

export const RouteScopes = {
  TOP: 'top',
  BOTTOM: 'bottom',
} as const;

const sidebarRoutes = [
  {
    icon: IconEmployees,
    selectedIcon: IconEmployeesWhite,
    label: 'Employees',
    scope: RouteScopes.TOP,
    path: AppRoutes.EMPLOYEES_TABLE.path,
  },
  {
    icon: IconUserProfile,
    selectedIcon: IconUserProfileWhite,
    label: 'Stuff',
    scope: RouteScopes.TOP,
    path: AppRoutes.STUFF.path,
  },
  {
    icon: IconUser,
    selectedIcon: IconUser,
    label: 'My profile',
    scope: RouteScopes.BOTTOM,
    path: AppRoutes.EMPLOYEES_TABLE.path,
  },
  {
    icon: IconHome,
    selectedIcon: IconHome,
    label: 'Accommodations',
    scope: RouteScopes.TOP,
    path: AppRoutes.ACCOMMODATIONS.path,
  },
  {
    icon: IconGlobe,
    selectedIcon: IconGlobe,
    label: 'Companies',
    scope: RouteScopes.TOP,
    path: AppRoutes.COMPANIES.path,
  },
];

export const AdminSidebar = (): JSX.Element => {
  const { t } = useTranslation();
  const topRoutes = useMemo(() => sidebarRoutes.filter((route) => route.scope === RouteScopes.TOP), []);
  const bottomRoutes = useMemo(() => sidebarRoutes.filter((route) => route.scope === RouteScopes.BOTTOM), []);
  const [isWorkerInfoVisible, setIsWorkerInfoVisible] = useState(false);
  const personalData = useTypedSelector((state) => state.userReducer.user);

  const onProfileClickHandler = (): void => {
    setIsWorkerInfoVisible(!isWorkerInfoVisible);
  };

  return (
    <section className={classNames('admin-sidebar')}>
      <nav className={classNames('admin-sidebar-navigation')}>
        <div className={classNames('admin-sidebar-top-routes')}>
          <LanguageSwitcherDropdown />
          {topRoutes.map(({ icon, label, path, selectedIcon }, i) => (
            <AdminSidebarItem selectedIcon={selectedIcon} path={path} icon={icon} label={t(label)} key={i} />
          ))}
        </div>
        <div className={classNames('admin-sidebar-bottom-routes')} onClick={onProfileClickHandler}>
          {bottomRoutes.map(({ icon, label, path, selectedIcon }, i) => (
            <AdminSidebarItem selectedIcon={selectedIcon} path={path} icon={icon} label={t(label)} key={i} />
          ))}
          {isWorkerInfoVisible && (
            <div className="worker-info-popup">
              <div className={classNames('worker-info-popup-name')}>
                {personalData?.personalInfo.firstName + ' ' + personalData?.personalInfo.lastName}
              </div>
              <div className={classNames('worker-info-popup-role')}>{personalData?.role.toUpperCase()}</div>
              <div className={classNames('worker-info-popup-email')}>{personalData?.personalInfo.email}</div>
            </div>
          )}
        </div>
      </nav>
    </section>
  );
};
