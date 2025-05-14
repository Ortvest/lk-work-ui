import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { Header } from '@modules/Header';
import { Sidebar } from '@modules/Sidebar';

import { GlobalContainer } from '@shared/components/GlobalContainer';

import { AppRoutes } from './routes.constans';

export const AuthLayout = ({ authed }: { authed: boolean }): JSX.Element => {
  const location = useLocation();
  const sidebarExcludedRoutes = [AppRoutes.QUESTIONNAIRE.path];

  const shouldShowSidebar = !sidebarExcludedRoutes.includes(location.pathname);
  if (!authed) {
    return <Navigate to={AppRoutes.SIGN_IN.path} replace />;
  }

  return (
    <div className="layout-container">
      <Header />
      <GlobalContainer>
        {shouldShowSidebar && <Sidebar />}
        <Outlet />
      </GlobalContainer>
    </div>
  );
};
