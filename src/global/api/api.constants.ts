export const API_CONFIG = {
  signIn: (): string => '/auth/sign-in',
  authMe: (): string => '/auth/me',
  collectData: (employeeId: string): string => `/employee/collect-data?employeeId=${employeeId}`,
  uploadPhoto: (): string => '/upload',
  getUploadedPhoto: (fileKey: string): string => `/signed-url?fileKey=${fileKey}`,
};
