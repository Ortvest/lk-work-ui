import { createBrowserRouter } from 'react-router-dom';

import { EmployeesTable } from '@modules/EmployeesTable';
import { Login } from '@modules/Login';
import { TeamMembersTable } from '@modules/TeamMembersTable';

import { AppLayout } from './AppLayout';
import { AuthLayout } from './AuthLayout';
import { AppRoutes } from './routes.constants';
import { AuthLanding } from '@pages/AuthLanding';
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
          element: <Login />,
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
          element: <AuthLanding />,
        },
        {
          path: AppRoutes.AUTHED_EMPLOYEES_PAGE.path,
          element: <EmployeesTable />,
        },
        {
          path: AppRoutes.AUTHED_TEAM_MEMBERS_PAGE.path,
          element: <TeamMembersTable />,
        },
      ],
    },
    {
      path: '*',
      element: null,
    },
  ]);
