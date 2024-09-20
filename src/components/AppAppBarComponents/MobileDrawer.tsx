import React from 'react';
import { Drawer } from '@mui/material';

import SidebarComponent from '../SidebarComponent';

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
        <SidebarComponent />
      </Drawer>
    </nav>
  );
};

export default MobileDrawer;
