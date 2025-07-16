import { Route, Routes } from 'react-router-dom';

import { EmployeeLayout } from '@global/router/layouts/EmployeeLayout';
import { ProtectedRoute } from '@global/router/ProtectedRoute';
import { AppRoutes } from '@global/router/routes.constans';

import { NotFound } from '@modules/NotFound';

import { UserRoles } from '@shared/enums/user.enums';

export const EmployeeRoutes = (): JSX.Element => {
  const routes = Object.values(AppRoutes).filter(
    (route) => route.allowedRoles?.includes(UserRoles.EMPLOYEE) && typeof route.element === 'function'
  );

  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} element={<ProtectedRoute allowedRoles={route.allowedRoles!} />}>
          <Route path={route.path} element={<EmployeeLayout>{route.element && <route.element />}</EmployeeLayout>} />
        </Route>
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
