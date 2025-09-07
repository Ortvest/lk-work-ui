import { ReactNode } from 'react';

import { Toaster } from 'react-hot-toast';

import { AdminSidebar } from '@modules/AdminSidebar';

import { AdminGlobalContainer } from '@shared/components/AdminGlobalContainer';

interface OfficeWorkerLayoutProps {
  children: ReactNode;
}

export const OfficeWorkerLayout = ({ children }: OfficeWorkerLayoutProps): JSX.Element => {
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
