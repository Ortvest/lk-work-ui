import { useEffect } from 'react';

import { RouterProvider } from 'react-router-dom';

import { Router } from '@global/router/AppRouter';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import '@shared/config/style.config.css';

import { useGetMeQuery } from '@global/api/auth/auth.api';
import { UserRoles } from '@shared/enums/user.enums';

export const App = (): JSX.Element => {
  const { refetch } = useGetMeQuery(undefined);

  useEffect(() => {
    refetch();
  }, []);

  const { isAuth, user } = useTypedSelector((state) => state.userReducer);

  const currentRouter = Router(Boolean(isAuth), user?.role === UserRoles.SUPER_ADMIN);

  return <RouterProvider router={currentRouter} key={String(isAuth)} />;
};
