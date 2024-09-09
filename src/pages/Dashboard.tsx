import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FavoritesList from '../components/DashboardComponents/FavoritesList';
import SharedWorkspaces from '../components/DashboardComponents/SharedWorkspaces';
import RecentWorkspaces from '../components/DashboardComponents/RecentWorkspaces';
import DocumentFormModal from '../components/DocumentComponents/DocumentModals/DocumentFormModal';

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
          <RecentWorkspaces />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FavoritesList />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <SharedWorkspaces />
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
              <DocumentFormModal
                workspaceId={''}
                onDocumentAdded={function (newDocument: any): void {
                  throw new Error('Function not implemented.');
                }}
              />
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
