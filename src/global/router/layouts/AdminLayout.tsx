import { ReactNode } from 'react';

import { Toaster } from 'react-hot-toast';

import { AdminSidebar } from '@modules/AdminSidebar';

import { AdminGlobalContainer } from '@shared/components/AdminGlobalContainer';

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps): JSX.Element => {
  return (
    <div className="layout-container">
      <AdminGlobalContainer>
        <AdminSidebar />
        {children}
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      </AdminGlobalContainer>
    </div>
  );
};
