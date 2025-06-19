import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AdminLayout } from '@global/router/AdminLayout';
import { AppLayout } from '@global/router/AppLayout';
import { AuthLayout } from '@global/router/AuthLayout';
import { AppRoutes } from '@global/router/routes.constans';

import { BankInformation } from '@modules/BankInfo';
import { DrivingLicence } from '@modules/Documents/DrivingLicence';
import { Embassy } from '@modules/Documents/Embassy';
import { Passport } from '@modules/Documents/Passport';
import { ResidenceCard } from '@modules/Documents/ResidenceCard';
import { StudentCard } from '@modules/Documents/StudentCard';
import { VisaInfo } from '@modules/Documents/VisaInfo';
import { WorkPermission } from '@modules/Documents/WorkPermission';
import { EmployeesTable } from '@modules/EmployeesTable';
import { JobInformation } from '@modules/JobInfo';
import { Location } from '@modules/Location';
import { NotFound } from '@modules/NotFound';
import { PersonalInfoForm } from '@modules/PersonalInfo';
import { Questionnaire } from '@modules/Questionnaire';
import { SignIn } from '@modules/SignIn';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { SetNewPassword } from '@pages/SetNewPassword';
import { UserDocumentsStatuses } from '@shared/enums/user.enums';

export const Router = (authed: boolean, isAdmin: boolean): ReturnType<typeof createBrowserRouter> => {
  const userDocumentStatus = useTypedSelector((state) => state.userReducer.user?.documentStatus);
  // Admin routes only
  if (authed && isAdmin) {
    return createBrowserRouter([
      {
        path: '/',
        element: <AdminLayout authed={authed} isAdmin={isAdmin} />,
        children: [
          {
            path: '',
            element: <Navigate to={AppRoutes.EMPLOYEES_TABLE.path} replace />,
          },
          {
            path: AppRoutes.EMPLOYEES_TABLE.path,
            element: <EmployeesTable />,
          },
          {
            path: '*',
            element: <NotFound />,
          },
        ],
      },
    ]);
  }

  // Authenticated user routes
  if (authed && !isAdmin) {
    return createBrowserRouter([
      {
        path: '/',
        element: <AuthLayout authed={authed} />,
        children: [
          {
            path: '',
            element:
              userDocumentStatus === UserDocumentsStatuses.WAITING_FOR_BRIEFING ? (
                <Navigate to={AppRoutes.QUESTIONNAIRE.path} replace />
              ) : (
                <Navigate to={AppRoutes.PERSONAL_INFO.path} replace />
              ),
          },
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
            element: <JobInformation />,
          },
          {
            path: AppRoutes.BANK_INFO.path,
            element: <BankInformation />,
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
          {
            path: AppRoutes.QUESTIONNAIRE.path,
            element: <Questionnaire />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ]);
  }

  // Not authed — public (sign in)
  return createBrowserRouter([
    {
      path: '/',
      element: <AppLayout authed={authed} />,
      children: [
        {
          path: '',
          element: <Navigate to={AppRoutes.SIGN_IN.path} replace />,
        },
        {
          path: AppRoutes.SIGN_IN.path,
          element: <SignIn />,
        },
        {
          path: AppRoutes.SET_NEW_PASSWORD.path,
          element: <SetNewPassword />,
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ]);
};
