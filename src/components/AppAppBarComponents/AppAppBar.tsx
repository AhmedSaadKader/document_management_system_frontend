import React, { useState } from 'react';
import {
  IconButton,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../context/auth_context';
import LanguageSelector from './LanguageSelector';
import MobileDrawer from './MobileDrawer';
import NavLinks from './NavLinks';
import UserMenu from './UserMenu';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const drawerWidth = 240;

function AppAppBar() {
  const { t } = useTranslation();
  const { isAuthenticated, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position='sticky' component='nav'>
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
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {t('appBar.title')}
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <LanguageSelector />
          <NavLinks />
          {isAuthenticated ? (
            <UserMenu
              anchorEl={anchorEl}
              handleMenu={handleMenu}
              handleClose={handleClose}
              handleSignOut={signOut}
            />
          ) : (
            <Button color='inherit' href='/signin'>
              {t('appBar.login')}
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <MobileDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />
    </Box>
  );
}

export default AppAppBar;
