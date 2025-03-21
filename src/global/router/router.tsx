import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AppLayout } from '@global/router/AppLayout';
import { AppRoutes } from '@global/router/routes.constans';

import { BankInfo } from '@modules/BankInfo';
import { Documents } from '@modules/Documents';
import { JobInfo } from '@modules/JobInfo';
import { Location } from '@modules/Location';
import { PersonalInfo } from '@modules/PersonalInfo';

export const router = (authed: boolean): ReturnType<typeof createBrowserRouter> =>
  createBrowserRouter([
    {
      path: '/',
      element: <AppLayout authed={authed} />,
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
          element: <Documents />,
        },
      ],
    },
  ]);
