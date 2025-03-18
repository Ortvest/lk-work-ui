import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from '@global/router/AppLayout';
import { AppRoutes } from '@global/router/routes.constans';

import { PersonalInfo } from '@modules/PersonalInfo';

export const router = (authed: boolean): ReturnType<typeof createBrowserRouter> =>
  createBrowserRouter([
    {
      path: '/',
      element: <AppLayout authed={authed} />,
      children: [
        {
          path: AppRoutes.PERSONAL_INFO.path,
          element: <PersonalInfo />,
        },
      ],
    },
  ]);
