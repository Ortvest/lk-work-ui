import { Navigate, Outlet } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constans';

import { useTypedSelector } from '@shared/hooks/useTypedSelector';

interface ProtectedRouteProps {
  allowedRoles: string[];
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps): JSX.Element => {
  const { isAuth, user } = useTypedSelector((state) => state.userReducer);

  if (!isAuth || !user || !allowedRoles.includes(user.role)) {
    return <Navigate to={AppRoutes.SIGN_IN.path} replace />;
  }

  return <Outlet />;
};
