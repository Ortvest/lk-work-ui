import { useMemo, useState } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constans';

import { AdminSidebarItem } from '@modules/AdminSidebar/layout/Item';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { LanguageSwitcherDropdown } from '@shared/components/LanguageSwitcherDropdown';
import { SharedButton } from '@shared/components/SharedButton';

import CloseIcon from '@shared/assets/icons/CloseIcon.svg';
import IconEmployees from '@shared/assets/icons/IconEmployees.svg';
import IconEmployeesWhite from '@shared/assets/icons/IconEmployeesWhite.svg';
import IconGlobe from '@shared/assets/icons/IconGlobe.svg';
import IconHome from '@shared/assets/icons/IconHome.svg';
import IconUser from '@shared/assets/icons/IconUser.svg';
import IconUserProfile from '@shared/assets/icons/IconUserProfile.svg';
import IconUserProfileWhite from '@shared/assets/icons/IconUserProfileWhite.svg';

import './style.css';

import { useLogoutMutation } from '@global/api/auth/auth.api';
import { UserRole, UserRoles } from '@shared/enums/user.enums';

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
    roles: [UserRoles.SUPER_ADMIN, UserRoles.ACCOUNTANT, UserRoles.OFFICE_WORKER],
  },
  {
    icon: IconUserProfile,
    selectedIcon: IconUserProfileWhite,
    label: 'Stuff',
    scope: RouteScopes.TOP,
    path: AppRoutes.STUFF.path,
    roles: [UserRoles.SUPER_ADMIN],
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
    roles: [UserRoles.SUPER_ADMIN, UserRoles.ACCOUNTANT, UserRoles.OFFICE_WORKER],
  },
  {
    icon: IconGlobe,
    selectedIcon: IconGlobe,
    label: 'Companies',
    scope: RouteScopes.TOP,
    path: AppRoutes.COMPANIES.path,
    roles: [UserRoles.SUPER_ADMIN, UserRoles.ACCOUNTANT, UserRoles.OFFICE_WORKER],
  },
];

export const AdminSidebar = (): JSX.Element => {
  const { t } = useTranslation('employees-table');
  const userRole = useTypedSelector((state) => state.userReducer.user?.role) as Extract<
    UserRole,
    'super-admin' | 'office-worker' | 'accountant'
  >;
  const topRoutes = useMemo(
    () =>
      sidebarRoutes.filter(
        (route) => route.scope === RouteScopes.TOP && (!route.roles || route.roles.includes(userRole))
      ),
    [userRole]
  );
  const bottomRoutes = useMemo(() => sidebarRoutes.filter((route) => route.scope === RouteScopes.BOTTOM), []);
  const [isWorkerInfoVisible, setIsWorkerInfoVisible] = useState(false);
  const personalData = useTypedSelector((state) => state.userReducer.user);
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const onProfileClickHandler = (): void => {
    setIsWorkerInfoVisible(!isWorkerInfoVisible);
  };

  const onLogoutHandler = async (): Promise<void> => {
    try {
      const result = await logout();
      if (result?.data?.success) {
        navigate(AppRoutes.SIGN_IN.path);
      }
    } catch (e) {
      console.error('Logout failed:', e);
    }
  };

  return (
    <section className={classNames('admin-sidebar')}>
      <nav className={classNames('admin-sidebar-navigation')}>
        <div className={classNames('admin-sidebar-top-routes')}>
          <LanguageSwitcherDropdown />
          <span className="split"></span>
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
              <div className="worker-info-header">
                <div className="worker-info-title">{t('myAccountTitle')}</div>
                <div className="worker-info-subtitle">{t('myAccountSubtitle')}</div>
                <button className="worker-info-close-button">
                  <img src={CloseIcon} alt="close-icon" />
                </button>
              </div>

              <div className="worker-info-section">
                <div className="worker-info-name">
                  <label>{t('name')}:</label>
                  {personalData?.personalInfo.firstName + ' ' + personalData?.personalInfo.lastName}
                </div>
                <div className="worker-info-email">
                  <label>{t('columnEmail')}:</label> {personalData?.personalInfo.email}
                </div>
                <div className="worker-info-role">
                  <label>{t('columnRole')}:</label> {personalData?.role}
                </div>
              </div>

              <div className="worker-info-section">
                <div className="worker-info-reset">
                  <span>{t('passwordReset')}</span>
                  <button className="reset-btn">{t('resetButton')}</button>
                </div>
                <div className="reset-description">{t('resetSubtitle')}</div>
              </div>
              <div className="worker-info-footer" onClick={onLogoutHandler}>
                <SharedButton type="button" text={t('logout')} />
              </div>
            </div>
          )}
        </div>
      </nav>
    </section>
  );
};
