import { BankInformation } from '@modules/BankInfo';
import { DrivingLicence } from '@modules/Documents/DrivingLicence';
import { Embassy } from '@modules/Documents/Embassy';
import { Passport } from '@modules/Documents/Passport';
import { ResidenceCard } from '@modules/Documents/ResidenceCard';
import { StudentCard } from '@modules/Documents/StudentCard';
import { UkrainianStatementDocuments } from '@modules/Documents/UkrainianDocs';
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

import { AccommodationsPage } from '@pages/Accommodations';
import { CompaniesPage } from '@pages/Companies';
import { SetNewPassword } from '@pages/SetNewPassword';
import { StuffPage } from '@pages/Stuff';
import { WorkAssetsPage } from '@pages/WorkAssets';
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
    title: 'routeMain',
    usageScope: [UsageScopes.NONE],
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.OFFICE_WORKER, UserRoles.SUPER_ADMIN, UserRoles.ACCOUNTANT],
    element: null,
    isPublic: true,
  },

  SIGN_IN: {
    path: '/sign-in',
    isVisible: false,
    title: 'routeSignIn',
    usageScope: [UsageScopes.NONE],
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.OFFICE_WORKER, UserRoles.SUPER_ADMIN, UserRoles.ACCOUNTANT],
    element: SignIn,
    isPublic: true,
  },

  SUPPORT: {
    path: '/support',
    isVisible: true,
    title: 'routeSupport',
    usageScope: [UsageScopes.HEADER],
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.OFFICE_WORKER, UserRoles.SUPER_ADMIN, UserRoles.ACCOUNTANT],
    element: null,
    isPublic: true,
  },

  SET_NEW_PASSWORD: {
    path: '/set-password',
    isVisible: true,
    title: 'routeSetNewPassword',
    usageScope: [UsageScopes.NONE],
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.OFFICE_WORKER, UserRoles.SUPER_ADMIN, UserRoles.ACCOUNTANT],
    element: SetNewPassword,
    isPublic: true,
  },

  PERSONAL_INFO: {
    path: '/personal-info',
    isVisible: true,
    title: 'routePersonalInfo',
    usageScope: [UsageScopes.SIDEBAR],
    icon: PersonalIcon,
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.OFFICE_WORKER, UserRoles.SUPER_ADMIN, UserRoles.ACCOUNTANT],
    element: PersonalInfoForm,
    isPublic: false,
  },
  LOCATION: {
    path: '/location',
    isVisible: true,
    title: 'routeLocation',
    usageScope: [UsageScopes.SIDEBAR],
    icon: LocationIcon,
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.OFFICE_WORKER, UserRoles.SUPER_ADMIN, UserRoles.ACCOUNTANT],
    element: Location,
    isPublic: false,
  },
  JOB_INFO: {
    path: '/job-info',
    isVisible: true,
    title: 'routeJobInfo',
    usageScope: [UsageScopes.SIDEBAR],
    icon: JobIcon,
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.OFFICE_WORKER, UserRoles.SUPER_ADMIN, UserRoles.ACCOUNTANT],
    element: JobInformation,
    isPublic: false,
  },
  BANK_INFO: {
    path: '/bank-info',
    isVisible: true,
    title: 'routeBankInfo',
    usageScope: [UsageScopes.SIDEBAR],
    icon: BankIcon,
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.OFFICE_WORKER, UserRoles.SUPER_ADMIN, UserRoles.ACCOUNTANT],
    element: BankInformation,
    isPublic: false,
  },
  DOCUMENTS: {
    path: '/documents',
    isVisible: false,
    title: 'routeDocuments',
    usageScope: [UsageScopes.NONE],
    icon: DocumentsIcon,
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.OFFICE_WORKER, UserRoles.SUPER_ADMIN, UserRoles.ACCOUNTANT],
    element: null,
    isPublic: false,
  },
  PASSPORT: {
    path: '/documents/passport',
    isVisible: true,
    title: 'routePassport',
    usageScope: [UsageScopes.DOCUMENTS],
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.OFFICE_WORKER, UserRoles.SUPER_ADMIN, UserRoles.ACCOUNTANT],
    element: Passport,
    isPublic: false,
  },
  EMBASSY: {
    path: '/documents/embassy',
    isVisible: true,
    title: 'routeEmbassy',
    usageScope: [UsageScopes.DOCUMENTS],
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.OFFICE_WORKER, UserRoles.SUPER_ADMIN, UserRoles.ACCOUNTANT],
    element: Embassy,
    isPublic: false,
  },
  WORK_PERMISSION: {
    path: '/documents/work-permission',
    isVisible: true,
    title: 'routeWorkPermission',
    usageScope: [UsageScopes.DOCUMENTS],
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.OFFICE_WORKER, UserRoles.SUPER_ADMIN, UserRoles.ACCOUNTANT],
    element: WorkPermission,
    isPublic: false,
  },
  STUDENT_CARD: {
    path: '/documents/student-card',
    isVisible: true,
    title: 'routeStudentCard',
    usageScope: [UsageScopes.DOCUMENTS],
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.OFFICE_WORKER, UserRoles.SUPER_ADMIN, UserRoles.ACCOUNTANT],
    element: StudentCard,
    isPublic: false,
  },
  RESIDENCE_CARD: {
    path: '/documents/residence-card',
    isVisible: true,
    title: 'routeResidenceCard',
    usageScope: [UsageScopes.DOCUMENTS],
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.OFFICE_WORKER, UserRoles.SUPER_ADMIN, UserRoles.ACCOUNTANT],
    element: ResidenceCard,
    isPublic: false,
  },
  UKRAINIAN_STATEMENT_DOCUMENT: {
    path: '/documents/ukrainian-statement-document',
    isVisible: true,
    title: 'routeUkrainianStatementDocument',
    usageScope: [UsageScopes.DOCUMENTS],
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.OFFICE_WORKER, UserRoles.SUPER_ADMIN, UserRoles.ACCOUNTANT],
    element: UkrainianStatementDocuments,
    isPublic: false,
  },
  VISA_INFO: {
    path: '/documents/visa-info',
    isVisible: true,
    title: 'routeVisaInfo',
    usageScope: [UsageScopes.DOCUMENTS],
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.OFFICE_WORKER, UserRoles.SUPER_ADMIN, UserRoles.ACCOUNTANT],
    element: VisaInfo,
    isPublic: false,
  },
  DRIVING_LICENCE: {
    path: '/documents/driving-licence',
    isVisible: true,
    title: 'routeDrivingLicence',
    usageScope: [UsageScopes.DOCUMENTS],
    allowedRoles: [UserRoles.EMPLOYEE, UserRoles.OFFICE_WORKER, UserRoles.SUPER_ADMIN, UserRoles.ACCOUNTANT],
    element: DrivingLicence,
    isPublic: false,
  },
  QUESTIONNAIRE: {
    path: '/questionnaire',
    isVisible: false,
    title: 'routeQuestionnaire',
    usageScope: [UsageScopes.NONE],
    allowedRoles: [UserRoles.EMPLOYEE],
    element: Questionnaire,
    isPublic: false,
  },
  EMPLOYEES_TABLE: {
    path: '/employees-table',
    isVisible: false,
    title: 'routeEmployeesTable',
    usageScope: [UsageScopes.NONE],
    allowedRoles: [UserRoles.OFFICE_WORKER, UserRoles.SUPER_ADMIN, UserRoles.ACCOUNTANT],
    element: EmployeesTable,
    isPublic: false,
  },

  ACCOMMODATIONS: {
    path: '/accommodations',
    isVisible: true,
    title: 'routeAccommodations',
    usageScope: [UsageScopes.NONE],
    allowedRoles: [UserRoles.OFFICE_WORKER, UserRoles.SUPER_ADMIN, UserRoles.ACCOUNTANT],
    element: AccommodationsPage,
    isPublic: false,
  },

  WORK_ASSETS: {
    path: '/work-assets',
    isVisible: true,
    title: 'routeWorkAssets',
    usageScope: [UsageScopes.NONE],
    allowedRoles: [UserRoles.OFFICE_WORKER, UserRoles.SUPER_ADMIN, UserRoles.ACCOUNTANT],
    element: WorkAssetsPage,
    isPublic: false,
  },
  COMPANIES: {
    path: '/companies',
    isVisible: true,
    title: 'routeCompanies',
    usageScope: [UsageScopes.NONE],
    allowedRoles: [UserRoles.OFFICE_WORKER, UserRoles.SUPER_ADMIN, UserRoles.ACCOUNTANT],
    element: CompaniesPage,
    isPublic: false,
  },

  STUFF: {
    path: '/stuff',
    isVisible: true,
    title: 'routeStuff',
    usageScope: [UsageScopes.NONE],
    allowedRoles: [UserRoles.SUPER_ADMIN],
    element: StuffPage,
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
