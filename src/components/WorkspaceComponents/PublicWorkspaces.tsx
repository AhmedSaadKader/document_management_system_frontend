// components/DashboardComponents/PublicWorkspaces.tsx
import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import ApiClient from '../../services/APIClient';
import { Workspace } from '../../models/Workspace';
import { useTranslation } from 'react-i18next';
import WorkspaceCard from './WorkspaceCard';

const PublicWorkspaces: React.FC = () => {
  const { t } = useTranslation();
  const [publicWorkspaces, setPublicWorkspaces] = useState<Workspace[]>([]);

  useEffect(() => {
    const fetchPublicWorkspaces = async () => {
      try {
        const response = await ApiClient.getPublicWorkspaces();
        setPublicWorkspaces(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPublicWorkspaces();
  }, []);

  return (
    <>
      <Typography variant='h6' gutterBottom>
        {t('dashboard.publicWorkspaces')}
      </Typography>
      <Grid container spacing={3}>
        {publicWorkspaces.map((workspace) => (
          <Grid item xs={12} sm={6} md={4} key={workspace._id}>
            <WorkspaceCard workspace={workspace} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PublicWorkspaces;
