import { VacationFilter } from '@shared/enums/vacation.enums';

export const API_CONFIG = {
  signIn: (): string => '/auth/sign-in',
  authMe: (): string => '/auth/me',

  fetchEmployees: (location?: string, workStatus?: string, company?: string): string => `/employee/list?location=${location}&workStatus=${workStatus}&company=${company}`,
  fetchEmployeesRequests: (filter: VacationFilter): string => `/employee/vacations?filter=${filter}`,
  handleEmployeesRequest: (): string => '/employee/vacation/decision',
  inviteEmployee: (): string => '/employee/add',
  setNewPassword: (): string => '/employee/set-password',

  collectData: (employeeId: string): string => `/employee/collect-data?employeeId=${employeeId}`,
  uploadPhoto: (): string => '/upload',
  uploadUserPhoto: (): string => '/upload/photo',
  getUploadedPhoto: (fileKey: string): string => `/signed-url?fileKey=${fileKey}`,

  getAllAccommodations: (): string => '/accommodation/list',
  addAccommodations: (): string => '/accommodation/create',
  editAccommodation: (accommodationId: string): string => `/accommodation/edit?accommodationId=${accommodationId}`,
  removeAccommodation: (accommodationId: string): string => `/accommodation/remove?accommodationId=${accommodationId}`,

  getAllWorkCompanies: (): string => '/work-company/list',
  addWorkCompany: (): string => '/work-company/create',
  editWorkCompany: (workCompanyId: string): string => `/work-company/edit?accommodationId=${workCompanyId}`,
  removeWorkCompany: (workCompanyId: string): string => `/work-company/remove?accommodationId=${workCompanyId}`,
};
