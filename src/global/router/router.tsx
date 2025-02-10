import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from './AppLayout';
import { AuthLayout } from './AuthLayout';
import { AppRoutes } from './routes.constants';
import { LandingPage } from '@pages/Landing';

export const router = (authed: boolean): ReturnType<typeof createBrowserRouter> =>
  createBrowserRouter([
    //not authed user
    {
      path: '/',
      element: <AuthLayout authed={authed} />,
      children: [
        {
          path: AppRoutes.AUTH_LOG_IN.path,
          element: null,
        },
        {
          path: AppRoutes.AUTH_REGISTER.path,
          element: null,
        },
        {
          path: AppRoutes.MAIN.path,
          element: <LandingPage />,
        },
      ],
    },
    //authed user
    {
      path: '/',
      element: <AppLayout authed={authed} />,
      children: [
        {
          path: AppRoutes.AUTHED_MAIN_PAGE.path,
          element: null,
        },
      ],
    },
    {
      path: '*',
      element: null,
    },
  ]);
