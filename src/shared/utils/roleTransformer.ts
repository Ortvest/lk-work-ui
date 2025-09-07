import { UserRole, UserRoles } from '@shared/enums/user.enums';

export const getRoleLabel = (role: UserRole): string => {
  switch (role) {
    case UserRoles.OFFICE_WORKER:
      return 'Office Worker';
    case UserRoles.ACCOUNTANT:
      return 'Accountant';
    case UserRoles.EMPLOYEE:
      return 'Employee';
    default:
      return '';
  }
};
