export const API_CONFIG = {
  signIn: (): string => '/auth/sign-in',
  collectData: (employeeId: string): string => `/employee/collect-data?employeeId=${employeeId}`,
  authMe: (): string => '/auth/me',
};
