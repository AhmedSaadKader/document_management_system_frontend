// pages/Dashboard.tsx
import React, { useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import PublicWorkspaces from '../components/WorkspaceComponents/PublicWorkspaces';
import { logPageView } from '../firebase';

const Dashboard = () => {
  const { t } = useTranslation();

  useEffect(() => {
    logPageView('Dashboard');
  }, []);
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: 'calc(100% - 240px)',
        }}
      >
        <Typography variant='h5' color='textSecondary' gutterBottom>
          {t('dashboard.greeting')} {localStorage.getItem('first_name')}
        </Typography>
        {/* <Typography variant='h4' gutterBottom>
          {t('dashboard.title')}
        </Typography> */}
        <Grid item xs={12} sm={6} md={4}>
          <PublicWorkspaces />
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
