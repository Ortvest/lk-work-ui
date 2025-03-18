import BankIcon from '@shared/assets/icons/BankIcon.svg';
import DocumentsIcon from '@shared/assets/icons/DocumentsIcon.svg';
import JobIcon from '@shared/assets/icons/JobIcon.svg';
import LocationIcon from '@shared/assets/icons/LocationIcon.svg';
import PersonalIcon from '@shared/assets/icons/PersonalIcon.svg';

export const UsageScopes = {
  NONE: 'none',
  HEADER: 'header',
  SIDEBAR: 'sidebar',
} as const;

export const AppRoutes = {
  MAIN: { path: '/', isVisible: false, title: 'Main', usageScope: [UsageScopes.NONE] },

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
    path: '/documents',
    isVisible: true,
    title: 'Documents',
    usageScope: [UsageScopes.SIDEBAR],
    icon: DocumentsIcon,
  },
};

export type AppRoute = { path: string; isVisible: boolean; title: string; usageScope: string[]; icon?: string };
