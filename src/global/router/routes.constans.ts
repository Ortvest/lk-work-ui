import BankIcon from '@shared/assets/icons/BankIcon.svg';
import DocumentsIcon from '@shared/assets/icons/DocumentsIcon.svg';
import JobIcon from '@shared/assets/icons/JobIcon.svg';
import LocationIcon from '@shared/assets/icons/LocationIcon.svg';
import PersonalIcon from '@shared/assets/icons/PersonalIcon.svg';

export const UsageScopes = {
  NONE: 'none',
  HEADER: 'header',
  SIDEBAR: 'sidebar',
  DOCUMENTS: 'documents',
} as const;

export const AppRoutes = {
  MAIN: { path: '/', isVisible: false, title: 'Main', usageScope: [UsageScopes.NONE] },

  SIGN_IN: { path: '/sign-in', isVisible: false, title: 'Sign In', usageScope: [UsageScopes.NONE] },

  SUPPORT: { path: '/support', isVisible: true, title: 'Support', usageScope: [UsageScopes.HEADER] },

  PERSONAL_INFO: {
    path: '/personal-info',
    isVisible: true,
    title: 'Personal info',
    usageScope: [UsageScopes.SIDEBAR],
    icon: PersonalIcon,
  },
  LOCATION: {
    path: '/location',
    isVisible: true,
    title: 'Location',
    usageScope: [UsageScopes.SIDEBAR],
    icon: LocationIcon,
  },
  JOB_INFO: {
    path: '/job-info',
    isVisible: true,
    title: 'Job Info',
    usageScope: [UsageScopes.SIDEBAR],
    icon: JobIcon,
  },
  BANK_INFO: {
    path: '/bank-info',
    isVisible: true,
    title: 'Bank info',
    usageScope: [UsageScopes.SIDEBAR],
    icon: BankIcon,
  },
  DOCUMENTS: {
    path: 'documents',
    isVisible: false,
    title: 'Documents',
    usageScope: [UsageScopes.NONE],
    icon: DocumentsIcon,
  },
  PASSPORT: {
    path: '/documents/passport',
    isVisible: true,
    title: 'Passport',
    usageScope: [UsageScopes.DOCUMENTS],
  },
  EMBASSY: {
    path: '/documents/embassy',
    isVisible: true,
    title: 'Embassy',
    usageScope: [UsageScopes.DOCUMENTS],
  },
  WORK_PERMISSION: {
    path: '/documents/work-permission',
    isVisible: true,
    title: 'Work Permission',
    usageScope: [UsageScopes.DOCUMENTS],
  },
  STUDENT_CARD: {
    path: '/documents/student-card',
    isVisible: true,
    title: 'Student Card',
    usageScope: [UsageScopes.DOCUMENTS],
  },
  RESIDENCE_CARD: {
    path: '/documents/residence-card',
    isVisible: true,
    title: 'Residence Card',
    usageScope: [UsageScopes.DOCUMENTS],
  },
  VISA_INFO: {
    path: '/documents/visa-info',
    isVisible: true,
    title: 'Visa Info',
    usageScope: [UsageScopes.DOCUMENTS],
  },
  DRIVING_LICENCE: {
    path: '/documents/driving-licence',
    isVisible: true,
    title: 'Driving Licence',
    usageScope: [UsageScopes.DOCUMENTS],
  },
  QUESTIONNAIRE: {
    path: '/questionnaire',
    isVisible: false,
    title: 'Questionnaire',
    usageScope: [UsageScopes.NONE],
  },
  EMPLOYEERS_TABLE: {
    path: 'employeers-table',
    isVisible: false,
    title: 'employeers-table',
    usageScope: [UsageScopes.NONE],
  },
};

export type AppRoute = { path: string; isVisible: boolean; title: string; usageScope: string[]; icon?: string };
