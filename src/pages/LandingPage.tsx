import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTutorial } from '../tutorial/driverjs/TutorialContext';
import {
  getRouteForLoginStep,
  RegisterLoginSteps,
} from '../tutorial/react_joyRide/RegisterLoginSteps';
import JoyRideWithConfiguration from '../tutorial/react_joyRide/JoyRideStepsConfiguration';

function LandingPage() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isTutorialMode } = useTutorial();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("/background-image.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* {isTutorialMode && (
        <>
          <JoyRideWithConfiguration
            steps={RegisterLoginSteps}
            shouldShowJoyride={isTutorialMode}
            getRouteForStep={getRouteForLoginStep}
          />
        </>
      )} */}
      <Container sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Grid
          container
          spacing={4}
          direction={isMobile ? 'column' : 'row'}
          justifyContent='center'
          alignItems='center'
        >
          <Grid item xs={12} md={6}>
            <Typography
              className='login-tutorial'
              variant={isMobile ? 'h3' : 'h2'}
              color='primary'
              gutterBottom
            >
              {t('landingPage.welcome')}
            </Typography>
            <Typography variant='body1' color='textSecondary' paragraph>
              {t('landingPage.description')}
            </Typography>
            <Button
              href='/signin'
              variant='contained'
              color='primary'
              size='large'
              sx={{ mr: 2, ml: 1 }}
            >
              {t('landingPage.login')}
            </Button>
            <Button
              href='/signup'
              variant='outlined'
              color='secondary'
              size='large'
            >
              {t('landingPage.register')}
            </Button>
          </Grid>
        </Grid>
      </Container>
      {/* <Box sx={{ py: 2, textAlign: 'center', backgroundColor: 'primary.main' }}>
        <Typography variant='body2' color='white'>
          &copy; {new Date().getFullYear()} Document Management System. All
          rights reserved.
        </Typography>
      </Box> */}
    </Box>
  );
}

export default LandingPage;
