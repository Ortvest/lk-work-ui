import { Toaster } from 'react-hot-toast';
import { Navigate, Outlet } from 'react-router-dom';

import { AdminSidebar } from '@modules/AdminSidebar';

import { AdminGlobalContainer } from '@shared/components/AdminGlobalContainer';

import { AppRoutes } from './routes.constans';

export const AdminLayout = ({ authed, isAdmin }: { authed: boolean; isAdmin: boolean }): JSX.Element => {
  if (!authed || !isAdmin) {
    return <Navigate to={AppRoutes.SIGN_IN.path} replace />;
  }

  return (
    <div className="layout-container">
      <AdminGlobalContainer>
        <AdminSidebar />
        <Outlet />
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      </AdminGlobalContainer>
    </div>
  );
};
