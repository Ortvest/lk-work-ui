export const API_CONFIG = {
  signIn: (): string => '/auth/sign-in',
  authMe: (): string => '/auth/me',

  fetchEmployees: (): string => '/employee/list',
  fetchEmployeesRequests: (): string => '/employee/vacations',
  handleEmployeesRequest: (): string => '/employee/vacation/decision',
  inviteEmployee: (): string => '/employee/add',
  setNewPassword: (): string => '/employee/set-password',

  collectData: (employeeId: string): string => `/employee/collect-data?employeeId=${employeeId}`,
  uploadPhoto: (): string => '/upload',
  uploadUserPhoto: (): string => '/upload/photo',
  getUploadedPhoto: (fileKey: string): string => `/signed-url?fileKey=${fileKey}`,
};
