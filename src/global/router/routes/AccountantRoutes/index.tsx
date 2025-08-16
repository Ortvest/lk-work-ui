import { Route, Routes } from 'react-router-dom';

import { AdminLayout } from '@global/router/layouts/AdminLayout';
import { ProtectedRoute } from '@global/router/ProtectedRoute';
import { AppRoutes } from '@global/router/routes.constans';

import { NotFound } from '@modules/NotFound';

import { UserRoles } from '@shared/enums/user.enums';

export const AccountantRoutes = (): JSX.Element => {
  const routes = Object.values(AppRoutes).filter(
    (route) => route.allowedRoles?.includes(UserRoles.ACCOUNTANT) && typeof route.element === 'function'
  );

  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} element={<ProtectedRoute allowedRoles={route.allowedRoles!} />}>
          <Route path={route.path} element={<AdminLayout>{route.element && <route.element />}</AdminLayout>} />
        </Route>
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
