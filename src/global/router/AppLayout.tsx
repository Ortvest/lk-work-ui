import { Navigate, Outlet } from 'react-router-dom';

import { Header } from '@modules/Header';
import { Sidebar } from '@modules/Sidebar';

import { GlobalContainer } from '@shared/components/GlobalContainer';

import { AppRoutes } from './routes.constans';

export const AppLayout = ({ authed }: { authed: boolean }): JSX.Element => {
  if (!authed) {
    return <Navigate to={AppRoutes.MAIN.path} replace />;
  }

  return (
    <div className="layout-container">
      <Header />
      <GlobalContainer>
        <Sidebar />
        <Outlet />
      </GlobalContainer>
    </div>
  );
};
