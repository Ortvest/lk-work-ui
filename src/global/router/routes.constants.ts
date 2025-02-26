export const UsageScopes = {
  AUTH: 'auth',
  LANDING: 'landing',
  SYSTEM: 'system',
} as const;

export const AppRoutes = {
  AUTH: { path: '/auth', isVisible: false, title: 'Auth', usageScope: [UsageScopes.AUTH] },
  AUTH_LOG_IN: { path: '/auth/login', isVisible: false, title: 'Auth', usageScope: [UsageScopes.AUTH] },
  AUTH_REGISTER: { path: '/auth/register', isVisible: false, title: 'Auth', usageScope: [UsageScopes.AUTH] },
  MAIN: {
    path: '/',
    isVisible: false,
    title: 'Main',
    usageScope: [UsageScopes.LANDING],
  },
  AUTHED_MAIN_PAGE: {
    path: '/:user-id',
    isVisible: true,
    title: '',
    usageScope: [UsageScopes.SYSTEM],
  },
  AUTHED_EMPLOYEES_PAGE: {
    path: '/employees',
    isVisible: true,
    title: '',
    usageScope: [UsageScopes.SYSTEM],
  },
  AUTHED_TEAM_MEMBERS_PAGE: {
    path: '/team-members',
    isVisible: true,
    title: '',
    usageScope: [UsageScopes.SYSTEM],
  },
};

export type AppRoute = { path: string; isVisible: boolean; title: string; usageScope: string[] };
