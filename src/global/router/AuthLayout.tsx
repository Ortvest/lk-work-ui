import { Navigate, Outlet } from 'react-router-dom';

import { AppRoutes } from './routes.constants';

export const AuthLayout = ({ authed }: { authed: boolean }): JSX.Element => {
  if (authed) {
    return <Navigate to={AppRoutes.AUTHED_MAIN_PAGE.path} replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
