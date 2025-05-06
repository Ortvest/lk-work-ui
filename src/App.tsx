import { useEffect } from 'react';

import { RouterProvider } from 'react-router-dom';

import { UserSlice } from '@global/store/slices/User.slice';

import { router } from '@global/router/router';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import '@shared/config/style.config.css';

export const App = (): JSX.Element => {
  const dispatch = useTypedDispatch();
  const { setUserAuthStatus, setUserAdminStatus } = UserSlice.actions;

  useEffect(() => {
    const authed = localStorage.getItem('authed') === 'true';
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    dispatch(setUserAuthStatus(authed));
    dispatch(setUserAdminStatus(isAdmin));
  }, []);

  const authed = useTypedSelector((state) => state.userReducer.isAuth);
  const isAdmin = useTypedSelector((state) => state.userReducer.isAdmin);

  const currentRouter = router(Boolean(authed), Boolean(isAdmin));

  return <RouterProvider router={currentRouter} key={String(authed)} />;
};
