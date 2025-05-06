import { Navigate, Outlet } from 'react-router-dom';

import { GlobalContainer } from '@shared/components/GlobalContainer';

import { AppRoutes } from './routes.constans';

export const AdminLayout = ({ authed, isAdmin }: { authed: boolean; isAdmin: boolean }): JSX.Element => {
  if (!authed || !isAdmin) {
    return <Navigate to={AppRoutes.SIGN_IN.path} replace />;
  }

  return (
    <div className="layout-container">
      <GlobalContainer>
        <Outlet />
      </GlobalContainer>
    </div>
  );
};
