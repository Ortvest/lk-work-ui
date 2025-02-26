import { Fragment, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { UserSlice } from '@global/store/slices/test.slice';

import { AppRoutes } from '@global/router/routes.constants';

import { useTypedDispatch } from '@shared/hooks/useTypedDispatch';

import { Box, Button, TextField, Typography } from '@mui/material'; // Импортируем Typography для уведомления

export const Form = (): JSX.Element => {
  const { setUserCredentials, setUserAuthStatus } = UserSlice.actions;
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFieldsEmpty, setIsFieldsEmpty] = useState(false);

  const onLoginUserHandler = (): void => {
    if (!email || !password) {
      setIsFieldsEmpty(true);
      return;
    }

    setIsFieldsEmpty(false);
    dispatch(setUserCredentials({ email, password }));
    dispatch(setUserAuthStatus(true));
    navigate(AppRoutes.AUTHED_EMPLOYEES_PAGE.path);
  };

  return (
    <Fragment>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          variant="outlined"
          placeholder="Enter your email here..."
          name="email"
          size="small"
          value={email}
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          variant="outlined"
          placeholder="Enter your password here..."
          name="password"
          size="small"
          type="password"
          value={password}
        />
      </Box>

      {isFieldsEmpty && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
          Please fill in all fields.
        </Typography>
      )}

      <Button variant="contained" sx={{ mt: 3 }} onClick={onLoginUserHandler}>
        Enter to system
      </Button>
    </Fragment>
  );
};
