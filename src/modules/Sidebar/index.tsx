import { useNavigate } from 'react-router-dom';

import { AppRoutes } from '@global/router/routes.constants';

import { Box, Divider, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

export const Sidebar = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: 240,
        height: 'calc(100vh - 64px)',
        backgroundColor: '#ffffff',
        boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.2)',
        position: 'absolute',
      }}>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(AppRoutes.AUTHED_EMPLOYEES_PAGE.path)}>
            <ListItemText primary="Employees" />
          </ListItemButton>
        </ListItem>
        <Divider sx={{ my: 2, borderColor: 'grey.300' }} />
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate(AppRoutes.AUTHED_TEAM_MEMBERS_PAGE.path)}>
            <ListItemText primary="Team members" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};
