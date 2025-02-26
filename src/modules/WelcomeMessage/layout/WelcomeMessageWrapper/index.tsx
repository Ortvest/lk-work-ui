import { ReactNode } from 'react';

import { Box, Paper } from '@mui/material';

interface WelcomeMessageWrapperProps {
  children: ReactNode;
}

export const WelcomeMessageWrapper = ({ children }: WelcomeMessageWrapperProps): JSX.Element => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Paper elevation={3} sx={{ padding: 6, textAlign: 'center', maxWidth: 600 }}>
        {children}
      </Paper>
    </Box>
  );
};
