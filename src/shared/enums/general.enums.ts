export const EmployeeTableTabs = {
  HIRED: 'hired',
  FIRED: 'fired',
  VACATION_REQUESTS: 'vacation-requests',
  ON_VACATION: 'on-vacation',
};

export type EmployeeTableTab = (typeof EmployeeTableTabs)[keyof typeof EmployeeTableTabs];
