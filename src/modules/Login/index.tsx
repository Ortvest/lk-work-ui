import { Form } from '@modules/Login/features/Form';
import { LoginWrapper } from '@modules/Login/layout/LoginWrapper';
import { Title } from '@modules/Login/layout/Title';

import { Divider } from '@mui/material';

export const Login = (): JSX.Element => {
  return (
    <LoginWrapper>
      <Title />
      <Divider sx={{ my: 2, borderColor: 'grey.300' }} />
      <Form />
    </LoginWrapper>
  );
};
