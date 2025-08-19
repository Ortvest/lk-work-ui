import { UserRole, UserWorkStatus } from '@shared/enums/user.enums';
import { VacationFilter } from '@shared/enums/vacation.enums';

export const API_CONFIG = {
  signIn: (): string => '/auth/sign-in',
  authMe: (): string => '/auth/me',
  logout: (): string => '/auth/logout',
  sendResetPasswordEmail: (): string => '/auth/send-reset-password-email',

  fetchEmployees: (
    location?: string,
    workStatus?: string,
    company?: string,
    roles?: UserRole[],
    fullName?: string
  ): string => {
    const rolesParam = roles?.map((r) => `roles=${encodeURIComponent(r)}`).join('&') ?? '';
    return `/employee/list?location=${location}&workStatus=${workStatus}&company=${company}&${rolesParam}&fullName=${fullName}`;
  },
  fetchEmployeesRequests: (filter: VacationFilter): string => `/employee/vacations?filter=${filter}`,
  searchEmployers: (fullName: string, workStatus: UserWorkStatus): string =>
    `/employee/search?fullName=${fullName}&workStatus=${workStatus}`,
  handleEmployeesRequest: (): string => '/employee/vacation/decision',
  sentVacationRequest: (): string => '/employee/vacation',
  inviteEmployee: (): string => '/employee/add',
  setNewPassword: (): string => '/employee/set-password',
  removeVacation: (vacationId: string): string => `/employee/vacation?vacationId=${vacationId}`,
  editUserData: (employeeId: string): string => `/employee/edit-user-data?employeeId=${employeeId}`,
  removeStuffWorker: (employeeId: string): string => `/employee/remove-worker?employeeId=${employeeId}`,

  collectData: (employeeId: string): string => `/employee/collect-data?employeeId=${employeeId}`,
  uploadPhoto: (): string => '/upload',
  uploadUserPhoto: (): string => '/upload/photo',
  uploadPdf: (userId: string, contractId: string): string => `/upload/pdf?userId=${userId}&contractId=${contractId}`,
  getUploadedPhoto: (fileKey: string): string => `/signed-url?fileKey=${fileKey}`,

  getAllAccommodations: (): string => '/accommodation/list',
  addAccommodations: (): string => '/accommodation/create',
  editAccommodation: (accommodationId: string): string => `/accommodation/edit?accommodationId=${accommodationId}`,
  removeAccommodation: (accommodationId: string): string => `/accommodation/remove?accommodationId=${accommodationId}`,

  getAllWorkCompanies: (): string => '/work-company/list',
  addWorkCompany: (): string => '/work-company/create',
  editWorkCompany: (workCompanyId: string): string => `/work-company/edit?workCompanyId=${workCompanyId}`,
  removeWorkCompany: (workCompanyId: string): string => `/work-company/remove?workCompanyId=${workCompanyId}`,

  downloadDocument: (): string => '/pdf/generate',
  layOffEmployee: (employeeId: string, layOffDate: string): string =>
    `/employee/lay-off?employeeId=${employeeId}&layoffDate=${layOffDate}`,
};
