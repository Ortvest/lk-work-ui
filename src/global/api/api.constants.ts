export const API_CONFIG = {
  signIn: (): string => '/auth/sign-in',
  authMe: (): string => '/auth/me',

  fetchEmployees: (): string => '/employee/list',
  inviteEmployee: (): string => '/employee/add',

  collectData: (employeeId: string): string => `/employee/collect-data?employeeId=${employeeId}`,
  uploadPhoto: (): string => '/upload',
  uploadUserPhoto: (): string => '/upload/photo',
  getUploadedPhoto: (fileKey: string): string => `/signed-url?fileKey=${fileKey}`,
};
