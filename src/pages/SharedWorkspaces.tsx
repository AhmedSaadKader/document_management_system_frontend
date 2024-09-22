import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ApiClient from '../services/APIClient';
import WorkspaceCard from '../components/WorkspaceComponents/WorkspaceCard';

interface SharedWorkspacesProps {
  limit?: number; // Add limit prop to control how many items are displayed
}

const SharedWorkspaces: React.FC<SharedWorkspacesProps> = ({ limit }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [sharedWorkspaces, setSharedWorkspaces] = useState<any[]>([]);

  useEffect(() => {
    const fetchSharedDocuments = async () => {
      try {
        const response = await ApiClient.fetchSharedWorkspaces();
        setSharedWorkspaces(response);
      } catch (error) {
        console.error('Error fetching shared documents:', error);
      }
    };

    fetchSharedDocuments();
  }, []);

  const handleWorkspaceClick = (workspaceId: string) => {
    navigate(`/workspace/${workspaceId}`);
  };

  const displayedWorkspaces = limit
    ? sharedWorkspaces.slice(0, limit)
    : sharedWorkspaces;

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        {t('dashboard.sharedWithMe')}
      </Typography>
      {displayedWorkspaces.length > 0 ? (
        displayedWorkspaces.map((workspace) => (
          <Grid item xs={12} sm={6} md={4} key={workspace._id}>
            <WorkspaceCard workspace={workspace} />
          </Grid>
        ))
      ) : (
        <Typography>{t('dashboard.noSharedWorkspaces')}</Typography>
      )}
    </Box>
  );
};

export default SharedWorkspaces;
