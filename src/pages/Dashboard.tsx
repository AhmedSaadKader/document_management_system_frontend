import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        {t('dashboard.greeting')} {localStorage.getItem('first_name')}
      </Typography>
      <Typography variant='h4' gutterBottom>
        {t('dashboard.title')}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant='h6'>
              {t('dashboard.recentDocuments')}
            </Typography>
            {/* List recent documents here */}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant='h6'>{t('dashboard.favorites')}</Typography>
            {/* List favorite documents here */}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant='h6'>{t('dashboard.sharedWithMe')}</Typography>
            {/* List shared documents here */}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='h6'>{t('dashboard.workspaces')}</Typography>
              <Button color='inherit' href='/create-workspace'>
                {t('dashboard.createWorkspace')}
              </Button>
              <Button color='inherit' component={Link} to='/workspaces'>
                {t('dashboard.allWorkspaces')}
              </Button>
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='h6'>{t('dashboard.documents')}</Typography>
              <Button color='inherit' href='/create-document'>
                {t('dashboard.createDocument')}
              </Button>
              <Button color='inherit' component={Link} to='/documents'>
                {t('dashboard.allDocuments')}
              </Button>
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Button color='inherit' component={Link} to='/recycle-bin'>
              {t('dashboard.recycleBin')}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
