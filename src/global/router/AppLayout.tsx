import { Toaster } from 'react-hot-toast';
import { Navigate, Outlet } from 'react-router-dom';

import { Header } from '@modules/Header';

import { GlobalContainer } from '@shared/components/GlobalContainer';

import { AppRoutes } from './routes.constans';

export const AppLayout = ({ authed }: { authed: boolean }): JSX.Element => {
  if (authed) {
    return <Navigate to={AppRoutes.PERSONAL_INFO.path} replace />;
  }

  return (
    <div className="layout-container">
      <Header />
      <GlobalContainer>
        <Outlet />
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      </GlobalContainer>
    </div>
  );
};
