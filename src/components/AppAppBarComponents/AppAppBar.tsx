import React, { useState } from 'react';
import {
  IconButton,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  useMediaQuery,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../../context/auth_context';
import LanguageSelector from './LanguageSelector';
import MobileDrawer from './MobileDrawer';
import UserMenu from './UserMenu';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useThemeMode } from '../../context/theme_context';
import ThemeToggle from './ThemeToggle';
import { Tour } from '@mui/icons-material';
import { useTutorial } from '../../tutorial/driverjs/TutorialContext';
import TutorialButton from '../../tutorial/react_joyRide/TutorialButton';
// import { driverObj } from '../../tutorial/driverjs/Tutorial';
// import {
//   appBarTutorialSteps,
//   darkModeTutorialSteps,
//   languageTutorialSteps,
// } from '../../tutorial/driverjs/TutorialSteps';
// import TourComponent from '../../tutorial/react-joydrops/Joydrops';

const drawerWidth = 240;

function AppAppBar() {
  const { t } = useTranslation();
  const { isAuthenticated, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { mode, toggleColorMode } = useThemeMode();
  const isMdUp = useMediaQuery((theme: any) => theme.breakpoints.up('md'));
  const { isTutorialMode } = useTutorial();

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
    <Box>
      <AppBar
        position={isMdUp ? 'fixed' : 'static'}
        component='nav'
        sx={{
          display: 'flex',
        }}
      >
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
          <Typography
            variant='h6'
            component='div'
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'none', md: 'block' },
            }}
          >
            <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit' }}>
              {t('appBar.title')}
            </Link>
          </Typography>
          <Typography
            variant='h6'
            component='div'
            sx={{
              flexGrow: 1,
              display: { xs: 'block', sm: 'block', md: 'none' },
            }}
          >
            <Link to={`/`} style={{ textDecoration: 'none', color: 'inherit' }}>
              DMS
            </Link>
          </Typography>
          <div id='general-tutorial'></div>
          <Box sx={{ flexGrow: 1 }} />
          <TutorialButton />

          <Box
            // id='language-selectors'
            onClick={
              isTutorialMode
                ? (event) => {
                    event.stopPropagation();
                  }
                : undefined
            }
            id='language-selector'
          >
            <LanguageSelector />
          </Box>
          <ThemeToggle mode={mode} toggleColorMode={toggleColorMode} />
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
