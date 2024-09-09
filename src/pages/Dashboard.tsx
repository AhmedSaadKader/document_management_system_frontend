// pages/Dashboard.tsx
import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FavoritesList from '../components/DashboardComponents/FavoritesList';
import SharedWorkspaces from '../components/DashboardComponents/SharedWorkspaces';
import RecentWorkspaces from '../components/DashboardComponents/RecentWorkspaces';
import DocumentFormModal from '../components/DocumentComponents/DocumentModals/DocumentFormModal';
import CreateWorkspaceForm from '../components/WorkspaceComponents/CreateWorkspaceForm';
import Sidebar from '../components/DashboardComponents/SidebarComponent';

const Dashboard = () => {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          ml: 30, // Adjust margin left to make space for the sidebar
          width: 'calc(100% - 240px)', // Adjust width to account for sidebar
        }}
      >
        <Typography variant='h4' gutterBottom>
          {t('dashboard.greeting')} {localStorage.getItem('first_name')}
        </Typography>
        <Typography variant='h5' color='textSecondary' gutterBottom>
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
                <Typography variant='h6'>
                  {t('dashboard.workspaces')}
                </Typography>
                <CreateWorkspaceForm />
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
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
