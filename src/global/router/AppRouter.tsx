import { AccountantRoutes } from '@global/router/routes/AccountantRoutes';
import { AdminRoutes } from '@global/router/routes/AdminRoutes';
import { EmployeeRoutes } from '@global/router/routes/EmployeeRoutes';
import { OfficeWorkerRoutes } from '@global/router/routes/OfficeWorkerRoutes';
import { PublicRoutes } from '@global/router/routes/PublicRoutes';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { UserRoles } from '@shared/enums/user.enums';

export const AppRouter = (): JSX.Element => {
  const { isAuth, user } = useTypedSelector((state) => state.userReducer);

  if (!isAuth) return <PublicRoutes />;

  switch (user?.role) {
    case UserRoles.SUPER_ADMIN:
      return <AdminRoutes />;
    case UserRoles.OFFICE_WORKER:
      return <OfficeWorkerRoutes />;
    case UserRoles.EMPLOYEE:
      return <EmployeeRoutes />;
    case UserRoles.ACCOUNTANT:
      return <AccountantRoutes />;
    default:
      return <div>Unknown role</div>;
  }
};
