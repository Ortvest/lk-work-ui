import { ReactNode } from 'react';

import { AppBar, Container, Toolbar } from '@mui/material';

interface HeaderWrapperProps {
  children: ReactNode;
}

export const HeaderWrapper = ({ children }: HeaderWrapperProps): JSX.Element => {
  return (
    <AppBar position="static" color="primary">
      <Container maxWidth={false}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>{children}</Toolbar>
      </Container>
    </AppBar>
  );
};
