import { Route, Routes } from 'react-router-dom';

import { OfficeWorkerLayout } from '@global/router/layouts/OfficeWorkerLayout';
import { ProtectedRoute } from '@global/router/ProtectedRoute';
import { AppRoutes } from '@global/router/routes.constans';

import { NotFound } from '@modules/NotFound';

import { UserRoles } from '@shared/enums/user.enums';

export const OfficeWorkerRoutes = (): JSX.Element => {
  const routes = Object.values(AppRoutes).filter(
    (route) => route.allowedRoles?.includes(UserRoles.MANAGER) && typeof route.element === 'function'
  );

  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} element={<ProtectedRoute allowedRoles={route.allowedRoles!} />}>
          <Route
            path={route.path}
            element={<OfficeWorkerLayout>{route.element && <route.element />}</OfficeWorkerLayout>}
          />
        </Route>
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
