import { Toaster } from 'react-hot-toast';

// import { Navigate, Outlet } from 'react-router-dom';
import { AdminSidebar } from '@modules/AdminSidebar';
import { EmployeesTable } from '@modules/EmployeesTable';

import { AdminGlobalContainer } from '@shared/components/AdminGlobalContainer';

// import { AppRoutes } from './routes.constans';

// eslint-disable-next-line @typescript-eslint/no-unused-vars,no-empty-pattern
export const AdminLayout = ({}: { authed: boolean; isAdmin: boolean }): JSX.Element => {
  // if (!authed || !isAdmin) {
  //   return <Navigate to={AppRoutes.SIGN_IN.path} replace />;
  // }

  return (
    <div className="layout-container">
      <AdminGlobalContainer>
        <AdminSidebar />
        <EmployeesTable />
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      </AdminGlobalContainer>
    </div>
  );
};
