import { AdminRoutes } from '@global/router/routes/AdminRoutes';
import { EmployeeRoutes } from '@global/router/routes/EmployeeRoutes';
import { PublicRoutes } from '@global/router/routes/PublicRoutes';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { UserRoles } from '@shared/enums/user.enums';

export const AppRouter = (): JSX.Element => {
  const { isAuth, user } = useTypedSelector((state) => state.userReducer);

  if (!isAuth) return <PublicRoutes />;

  switch (user?.role) {
    case UserRoles.SUPER_ADMIN:
      return <AdminRoutes />;
    case UserRoles.MANAGER:
      return <AdminRoutes />;
    case UserRoles.EMPLOYEE:
      return <EmployeeRoutes />;
    default:
      return <div>Unknown role</div>;
  }
};
