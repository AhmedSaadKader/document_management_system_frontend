import * as React from 'react';
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
} from '@mui/material';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from '@mui/icons-material';
import { useAuth } from '../context/auth_context';
import { Link, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

// const navItems = ['Home'];

function AppAppBar() {
  const { isAuthenticated, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    handleClose();
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        DMS
      </Typography>
      <Divider />
      <List>
        <ListItem>
          <ListItemButton component={Link} to='/workspaces'>
            <ListItemText primary='All Workspaces' />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton component={Link} to='/documents'>
            <ListItemText primary='All Documents' />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton component={Link} to='/recycle-bin'>
            <ListItemText primary='Recycle Bin' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component='nav'>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography
              variant='h6'
              component='div'
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Document Management System
            </Typography>
          </Link>
          <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography
              variant='h6'
              component='div'
              sx={{ flexGrow: 1, display: { xs: 'block', sm: 'none' } }}
            >
              DMS
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { sm: 'none', md: 'block' } }}>
            <Button sx={{ color: '#fff' }} href='/workspaces'>
              Workspaces
            </Button>
            <Button sx={{ color: '#fff' }} href='/documents'>
              Documents
            </Button>
            <Button sx={{ color: '#fff' }} href='/recycle-bin'>
              Recycle Bin
            </Button>
          </Box>
          {isAuthenticated ? (
            <div>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    signOut();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Button color='inherit' href='/signin'>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
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
    </Box>
  );
}

export default AppAppBar;
