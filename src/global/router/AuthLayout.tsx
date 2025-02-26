import { Navigate, Outlet } from 'react-router-dom';

import { Header } from '@modules/Header';

import { AppRoutes } from './routes.constants';

export const AuthLayout = ({ authed }: { authed: boolean }): JSX.Element => {
  if (authed) {
    return <Navigate to={AppRoutes.AUTHED_EMPLOYEES_PAGE.path} replace />;
  }

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
