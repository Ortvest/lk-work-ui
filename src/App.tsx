import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { AppRouter } from '@global/router/AppRouter';
import { AppRoutes } from '@global/router/routes.constans';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import '@shared/config/style.config.css';

import { useGetMeQuery } from '@global/api/auth/auth.api';

export const App = (): JSX.Element => {
  const { refetch } = useGetMeQuery(undefined);
  const { isAuth } = useTypedSelector((state) => state.userReducer);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    refetch();

    if (!isAuth && location.pathname !== AppRoutes.SET_NEW_PASSWORD.path) {
      navigate(AppRoutes.SIGN_IN.path);
    }
  }, []);

  return <AppRouter />;
};
