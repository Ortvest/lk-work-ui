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
import { PersonalInfoForm } from '@modules/PersonalInfo';
import { Questionnaire } from '@modules/Questionnaire';
import { SignIn } from '@modules/SignIn';

import BankIcon from '@shared/assets/icons/BankIcon.svg';
import DocumentsIcon from '@shared/assets/icons/DocumentsIcon.svg';
import JobIcon from '@shared/assets/icons/JobIcon.svg';
import LocationIcon from '@shared/assets/icons/LocationIcon.svg';
import PersonalIcon from '@shared/assets/icons/PersonalIcon.svg';

import { SetNewPassword } from '@pages/SetNewPassword';
import { UserRole, UserRoles } from '@shared/enums/user.enums';

export const UsageScopes = {
  NONE: 'none',
  HEADER: 'header',
  SIDEBAR: 'sidebar',
  DOCUMENTS: 'documents',
} as const;

export const AppRoutes: Record<string, AppRoute> = {
  MAIN: {
    path: '/',
    isVisible: false,
    title: 'Main',
    usageScope: [UsageScopes.NONE],
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.MANAGER, UserRoles.SUPER_ADMIN],
    element: null,
    isPublic: true,
  },

  SIGN_IN: {
    path: '/sign-in',
    isVisible: false,
    title: 'Sign In',
    usageScope: [UsageScopes.NONE],
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.MANAGER, UserRoles.SUPER_ADMIN],
    element: SignIn,
    isPublic: true,
  },

  SUPPORT: {
    path: '/support',
    isVisible: true,
    title: 'Support',
    usageScope: [UsageScopes.HEADER],
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.MANAGER, UserRoles.SUPER_ADMIN],
    element: null,
    isPublic: true,
  },

  SET_NEW_PASSWORD: {
    path: '/set-password',
    isVisible: true,
    title: 'Set new password',
    usageScope: [UsageScopes.NONE],
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.MANAGER, UserRoles.SUPER_ADMIN],
    element: SetNewPassword,
    isPublic: true,
  },

  PERSONAL_INFO: {
    path: '/personal-info',
    isVisible: true,
    title: 'Personal info',
    usageScope: [UsageScopes.SIDEBAR],
    icon: PersonalIcon,
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.MANAGER, UserRoles.SUPER_ADMIN],
    element: PersonalInfoForm,
    isPublic: false,
  },
  LOCATION: {
    path: '/location',
    isVisible: true,
    title: 'Location',
    usageScope: [UsageScopes.SIDEBAR],
    icon: LocationIcon,
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.MANAGER, UserRoles.SUPER_ADMIN],
    element: Location,
    isPublic: false,
  },
  JOB_INFO: {
    path: '/job-info',
    isVisible: true,
    title: 'Job Info',
    usageScope: [UsageScopes.SIDEBAR],
    icon: JobIcon,
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.MANAGER, UserRoles.SUPER_ADMIN],
    element: JobInformation,
    isPublic: false,
  },
  BANK_INFO: {
    path: '/bank-info',
    isVisible: true,
    title: 'Bank info',
    usageScope: [UsageScopes.SIDEBAR],
    icon: BankIcon,
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.MANAGER, UserRoles.SUPER_ADMIN],
    element: BankInformation,
    isPublic: false,
  },
  DOCUMENTS: {
    path: 'documents',
    isVisible: false,
    title: 'Documents',
    usageScope: [UsageScopes.NONE],
    icon: DocumentsIcon,
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.MANAGER, UserRoles.SUPER_ADMIN],
    element: null,
    isPublic: false,
  },
  PASSPORT: {
    path: '/documents/passport',
    isVisible: true,
    title: 'Passport',
    usageScope: [UsageScopes.DOCUMENTS],
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.MANAGER, UserRoles.SUPER_ADMIN],
    element: Passport,
    isPublic: false,
  },
  EMBASSY: {
    path: '/documents/embassy',
    isVisible: true,
    title: 'Embassy',
    usageScope: [UsageScopes.DOCUMENTS],
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.MANAGER, UserRoles.SUPER_ADMIN],
    element: Embassy,
    isPublic: false,
  },
  WORK_PERMISSION: {
    path: '/documents/work-permission',
    isVisible: true,
    title: 'Work Permission',
    usageScope: [UsageScopes.DOCUMENTS],
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.MANAGER, UserRoles.SUPER_ADMIN],
    element: WorkPermission,
    isPublic: false,
  },
  STUDENT_CARD: {
    path: '/documents/student-card',
    isVisible: true,
    title: 'Student Card',
    usageScope: [UsageScopes.DOCUMENTS],
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.MANAGER, UserRoles.SUPER_ADMIN],
    element: StudentCard,
    isPublic: false,
  },
  RESIDENCE_CARD: {
    path: '/documents/residence-card',
    isVisible: true,
    title: 'Residence Card',
    usageScope: [UsageScopes.DOCUMENTS],
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.MANAGER, UserRoles.SUPER_ADMIN],
    element: ResidenceCard,
    isPublic: false,
  },
  VISA_INFO: {
    path: '/documents/visa-info',
    isVisible: true,
    title: 'Visa Info',
    usageScope: [UsageScopes.DOCUMENTS],
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.MANAGER, UserRoles.SUPER_ADMIN],
    element: VisaInfo,
    isPublic: false,
  },
  DRIVING_LICENCE: {
    path: '/documents/driving-licence',
    isVisible: true,
    title: 'Driving Licence',
    usageScope: [UsageScopes.DOCUMENTS],
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.MANAGER, UserRoles.SUPER_ADMIN],
    element: DrivingLicence,
    isPublic: false,
  },
  QUESTIONNAIRE: {
    path: '/questionnaire',
    isVisible: false,
    title: 'Questionnaire',
    usageScope: [UsageScopes.NONE],
    allowedRoles: [UserRoles.EMPLOYEE],
    element: Questionnaire,
    isPublic: false,
  },
  EMPLOYEES_TABLE: {
    path: '/employees-table',
    isVisible: false,
    title: 'employees-table',
    usageScope: [UsageScopes.NONE],
    allowedRoles: [UserRoles.MANAGER, UserRoles.SUPER_ADMIN],
    element: EmployeesTable,
    isPublic: false,
  },

  VACATIONS_TABLE: {
    path: 'vacations',
    isVisible: true,
    title: 'vacations-table',
    usageScope: [UsageScopes.SIDEBAR],
    allowedRoles: [UserRoles.MANAGER, UserRoles.SUPER_ADMIN],
    element: null,
    isPublic: false,
  },
};

export type AppRoute = {
  path: string;
  isVisible: boolean;
  title: string;
  usageScope: string[];
  icon?: string;
  allowedRoles?: UserRole[];
  element?: React.ComponentType | null;
  isPublic: boolean;
};
