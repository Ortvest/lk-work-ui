import { Route, Routes } from 'react-router-dom';

import { PublicLayout } from '@global/router/layouts/PublicLayout';
import { AppRoutes } from '@global/router/routes.constans';

import { NotFound } from '@modules/NotFound';

export const PublicRoutes = (): JSX.Element => {
  const publicRoutes = Object.values(AppRoutes).filter((route) => route.isPublic && route.element);

  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<PublicLayout>{route.element && <route.element />}</PublicLayout>}
        />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
