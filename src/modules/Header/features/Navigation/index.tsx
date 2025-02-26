import { useNavigate } from 'react-router-dom';

import { UserSlice } from '@global/store/slices/test.slice';

import { AppRoutes } from '@global/router/routes.constants';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';
import { useTypedSelector } from '@shared/hooks/useTypedSelector';

import { Button } from '@mui/material';

export const Navigation = (): JSX.Element => {
  const dispatch = useTypedDispatch();
  const { isAuth } = useTypedSelector((state) => state.userReducer);
  const { setUserAuthStatus } = UserSlice.actions;

  const navigate = useNavigate();

  const onNavigateToLoginPageHandler = (): void => {
    navigate(AppRoutes.AUTH.path);
  };

  const onLogoutHandler = (): void => {
    dispatch(setUserAuthStatus(false));
    navigate(AppRoutes.MAIN.path);
  };

  return isAuth ? (
    <Button color="inherit" variant="outlined" size="large" onClick={onLogoutHandler}>
      Log out
    </Button>
  ) : (
    <Button color="inherit" variant="outlined" size="large" onClick={onNavigateToLoginPageHandler}>
      Log in
    </Button>
  );
};
