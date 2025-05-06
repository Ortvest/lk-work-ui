import { Navigate } from 'react-router-dom';

import { Header } from '@modules/Header';
import { SignIn } from '@modules/SignIn';

import { GlobalContainer } from '@shared/components/GlobalContainer';

import { AppRoutes } from './routes.constans';

export const AppLayout = ({ authed }: { authed: boolean }): JSX.Element => {
  if (authed) {
    return <Navigate to={AppRoutes.QUESTIONNAIRE.path} replace />;
  }

  return (
    <div className="layout-container">
      <Header />
      <GlobalContainer>
        <SignIn />
      </GlobalContainer>
    </div>
  );
};
