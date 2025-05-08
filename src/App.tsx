import { useEffect } from 'react';

import { RouterProvider } from 'react-router-dom';

import { router } from '@global/router/router';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import '@shared/config/style.config.css';

import { useGetMeQuery } from '@global/api/auth/auth.api';

export const App = (): JSX.Element => {
  const { refetch } = useGetMeQuery(undefined);

  useEffect(() => {
    refetch();
  }, []);

  const authed = useTypedSelector((state) => state.userReducer.isAuth);

  const currentRouter = router(Boolean(authed), false);

  return <RouterProvider router={currentRouter} key={String(authed)} />;
};
