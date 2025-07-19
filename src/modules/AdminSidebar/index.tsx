import { useMemo } from 'react';

import classNames from 'classnames';

import { AppRoutes } from '@global/router/routes.constans';

import { AdminSidebarItem } from '@modules/AdminSidebar/layout/Item';

import IconDocument from '@shared/assets/icons/DocumentsIcon.svg';
import IconDocumentWhite from '@shared/assets/icons/DocumentsIconWhite.svg';
import IconBell from '@shared/assets/icons/IconBell.svg';
import IconBellWhite from '@shared/assets/icons/IconBellWhite.svg';
import IconEmployees from '@shared/assets/icons/IconEmployees.svg';
import IconEmployeesWhite from '@shared/assets/icons/IconEmployeesWhite.svg';
import IconGlobe from '@shared/assets/icons/IconGlobe.svg';
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
    label: 'Employee profile',
    scope: RouteScopes.TOP,
    path: AppRoutes.BANK_INFO.path,
  },
  {
    icon: IconDocument,
    selectedIcon: IconDocumentWhite,
    label: 'Employee documents',
    scope: RouteScopes.TOP,
    path: AppRoutes.BANK_INFO.path,
  },
  {
    icon: IconBell,
    selectedIcon: IconBellWhite,
    label: 'Notifications',
    scope: RouteScopes.BOTTOM,
    path: AppRoutes.BANK_INFO.path,
  },
  {
    icon: IconUser,
    selectedIcon: IconUser,
    label: 'My profile',
    scope: RouteScopes.BOTTOM,
    path: AppRoutes.BANK_INFO.path,
  },
  {
    icon: IconGlobe,
    selectedIcon: IconGlobe,
    label: 'Accommodations',
    scope: RouteScopes.TOP,
    path: AppRoutes.ACCOMMODATIONS.path,
  },
];
export const AdminSidebar = (): JSX.Element => {
  const topRoutes = useMemo(() => sidebarRoutes.filter((route) => route.scope === RouteScopes.TOP), [sidebarRoutes]);
  const bottomRoutes = useMemo(
    () => sidebarRoutes.filter((route) => route.scope === RouteScopes.BOTTOM),
    [sidebarRoutes]
  );
  return (
    <section className={classNames('admin-sidebar')}>
      <nav className={classNames('admin-sidebar-navigation')}>
        <div className={classNames('admin-sidebar-top-routes')}>
          {topRoutes.map(({ icon, label, path, selectedIcon }, i) => {
            console.log(`Label: ${label}, path: ${path}`);
            return <AdminSidebarItem selectedIcon={selectedIcon} path={path} icon={icon} label={label} key={i} />;
          })}
        </div>
        <div className={classNames('admin-sidebar-bottom-routes')}>
          {bottomRoutes.map(({ icon, label, path, selectedIcon }, i) => (
            <AdminSidebarItem selectedIcon={selectedIcon} path={path} icon={icon} label={label} key={i} />
          ))}
        </div>
      </nav>
    </section>
  );
};
