import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AppLayout } from '@global/router/AppLayout';
import { AuthLayout } from '@global/router/AuthLayout';
import { AppRoutes } from '@global/router/routes.constans';

import { BankInfo } from '@modules/BankInfo';
import { JobInfo } from '@modules/JobInfo';
import { Location } from '@modules/Location';
import { PersonalInfo } from '@modules/PersonalInfo';
import { SignIn } from '@modules/SignIn';

export const router = (authed: boolean): ReturnType<typeof createBrowserRouter> =>
  createBrowserRouter([
    //authed user
    {
      path: '/',
      element: <AuthLayout authed={authed} />,
      children: [
        {
          index: true,
          element: <Navigate to={AppRoutes.PERSONAL_INFO.path} replace />,
        },
        {
          path: AppRoutes.PERSONAL_INFO.path,
          element: <PersonalInfo />,
        },
        {
          path: AppRoutes.LOCATION.path,
          element: <Location />,
        },
        {
          path: AppRoutes.JOB_INFO.path,
          element: <JobInfo />,
        },
        {
          path: AppRoutes.BANK_INFO.path,
          element: <BankInfo />,
        },
        {
          path: AppRoutes.DOCUMENTS.path,
          element: null,
        },
      ],
    },
    // not authed user
    {
      path: '/',
      element: <AppLayout authed={authed} />,
      children: [
        {
          path: AppRoutes.SIGN_IN.path,
          element: <SignIn />,
        },
      ],
    },
  ]);
