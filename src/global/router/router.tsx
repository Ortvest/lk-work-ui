import { createBrowserRouter } from 'react-router-dom';

import { AppLayout } from '@global/router/AppLayout';
import { AuthLayout } from '@global/router/AuthLayout';
import { AppRoutes } from '@global/router/routes.constans';

import { BankInfo } from '@modules/BankInfo';
import { DrivingLicence } from '@modules/Documents/DrivingLicence';
import { Embassy } from '@modules/Documents/Embassy';
import { Passport } from '@modules/Documents/Passport';
import { ResidenceCard } from '@modules/Documents/ResidenceCard';
import { StudentCard } from '@modules/Documents/StudentCard';
import { VisaInfo } from '@modules/Documents/VisaInfo';
import { WorkPermission } from '@modules/Documents/WorkPermission';
import { JobInfo } from '@modules/JobInfo';
import { Location } from '@modules/Location';
import { PersonalInfoForm } from '@modules/PersonalInfo';
import { Questionnaire } from '@modules/PersonalInfo/features/Questionnaire';
import { SignIn } from '@modules/SignIn';

export const router = (authed: boolean): ReturnType<typeof createBrowserRouter> =>
  createBrowserRouter([
    //authed user
    {
      path: '/',
      element: <AuthLayout authed={authed} />,
      children: [
        {
          path: AppRoutes.PERSONAL_INFO.path,
          element: <PersonalInfoForm />,
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
          path: AppRoutes.PASSPORT.path,
          element: <Passport />,
        },
        {
          path: AppRoutes.EMBASSY.path,
          element: <Embassy />,
        },
        {
          path: AppRoutes.WORK_PERMISSION.path,
          element: <WorkPermission />,
        },
        {
          path: AppRoutes.STUDENT_CARD.path,
          element: <StudentCard />,
        },
        {
          path: AppRoutes.RESIDENCE_CARD.path,
          element: <ResidenceCard />,
        },
        {
          path: AppRoutes.VISA_INFO.path,
          element: <VisaInfo />,
        },
        {
          path: AppRoutes.DRIVING_LICENCE.path,
          element: <DrivingLicence />,
        },
        { path: AppRoutes.QUESTIONNAIRE.path, element: <Questionnaire /> },
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
