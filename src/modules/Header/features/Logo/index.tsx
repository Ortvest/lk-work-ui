import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constants';

import { Typography } from '@mui/material';

export const Logo = (): JSX.Element => {
  const navigate = useNavigate();

  const onNavigateToMainPageHandler = (): void => {
    navigate(AppRoutes.MAIN.path);
  };

  return (
    <Typography variant="h5" component="div" sx={{ cursor: 'pointer' }} onClick={onNavigateToMainPageHandler}>
      LK-Work
    </Typography>
  );
};
