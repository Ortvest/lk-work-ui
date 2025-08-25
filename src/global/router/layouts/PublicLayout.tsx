import { ReactNode } from 'react';

import { Toaster } from 'react-hot-toast';

import { Header } from '@modules/Header';

import { GlobalContainer } from '@shared/components/GlobalContainer';

interface PublicLayoutProps {
  children: ReactNode;
}

export const PublicLayout = ({ children }: PublicLayoutProps): JSX.Element => {
  return (
    <div className="layout-container">
      <Header />
      <GlobalContainer>
        {children}
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      </GlobalContainer>
    </div>
  );
};
