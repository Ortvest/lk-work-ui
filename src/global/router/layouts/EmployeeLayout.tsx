import { ReactNode } from 'react';

import { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constans';

import { Header } from '@modules/Header';
import { Sidebar } from '@modules/Sidebar';

import { GlobalContainer } from '@shared/components/GlobalContainer';

interface EmployeeLayoutProps {
  children: ReactNode;
}

export const EmployeeLayout = ({ children }: EmployeeLayoutProps): JSX.Element => {
  const location = useLocation();
  const sidebarExcludedRoutes = [AppRoutes.QUESTIONNAIRE.path];

  const shouldShowSidebar = !sidebarExcludedRoutes.includes(location.pathname);
  return (
    <div className="layout-container">
      <Header />
      <GlobalContainer>
        {shouldShowSidebar && <Sidebar />}
        {children}
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      </GlobalContainer>
    </div>
  );
};
