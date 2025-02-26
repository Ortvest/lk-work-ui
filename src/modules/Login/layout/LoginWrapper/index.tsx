import { ReactNode } from 'react';

import { Box, Paper } from '@mui/material';

interface LoginWrapperProps {
  children: ReactNode;
}

export const LoginWrapper = ({ children }: LoginWrapperProps): JSX.Element => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Paper elevation={3} sx={{ padding: 6, textAlign: 'center', maxWidth: 400, width: '100%', mx: 2 }}>
        {children}
      </Paper>
    </Box>
  );
};
