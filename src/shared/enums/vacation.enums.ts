export const VacationFilters = {
  ON_VACATION: 'on-vacation',
  VACATION_REQUESTS: 'vacation-requests',
};

export type VacationFilter = (typeof VacationFilters)[keyof typeof VacationFilters];
