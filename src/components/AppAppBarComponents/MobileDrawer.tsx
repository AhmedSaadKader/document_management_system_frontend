import React from 'react';
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface MobileDrawerProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  drawerWidth: number;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  mobileOpen,
  handleDrawerToggle,
  drawerWidth,
}) => {
  const { t } = useTranslation();

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        DMS
      </Typography>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton component={Link} to='/workspaces'>
            <ListItemText primary={t('appBar.workspaces')} />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton component={Link} to='/documents'>
            <ListItemText primary={t('appBar.documents')} />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton component={Link} to='/recycle-bin'>
            <ListItemText primary={t('appBar.recycleBin')} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <nav>
      <Drawer
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { sm: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    </nav>
  );
};

export default MobileDrawer;
