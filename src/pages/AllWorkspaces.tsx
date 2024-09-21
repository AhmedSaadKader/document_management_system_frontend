import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ApiClient from '../services/APIClient';
import WorkspaceCard from '../components/WorkspaceComponents/WorkspaceCard';

const AllWorkspacesPage = () => {
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const data = await ApiClient.fetchAllWorkspaces();
        setWorkspaces(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWorkspaces();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        {t('workspace.allWorkspaces')}
      </Typography>
      {workspaces.length > 0 ? (
        workspaces.map((workspace) => (
          <Grid item xs={12} sm={6} md={4} key={workspace._id}>
            <WorkspaceCard workspace={workspace} />
          </Grid>
        ))
      ) : (
        <Typography variant='body2' color='textSecondary'>
          {t('workspace.noWorkspaces')}
        </Typography>
      )}
    </Box>
  );
};

export default AllWorkspacesPage;
