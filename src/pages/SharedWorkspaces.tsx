import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ApiClient from '../services/APIClient';
import WorkspaceCard from '../components/WorkspaceComponents/WorkspaceCard';

interface SharedWorkspacesProps {
  limit?: number;
}

const SharedWorkspaces: React.FC<SharedWorkspacesProps> = ({ limit }) => {
  const { t } = useTranslation();
  const [sharedWorkspaces, setSharedWorkspaces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSharedDocuments = async () => {
      setLoading(true);
      try {
        const response = await ApiClient.fetchSharedWorkspaces();
        setSharedWorkspaces(response);
      } catch (error) {
        console.error('Error fetching shared documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSharedDocuments();
  }, []);

  const displayedWorkspaces = limit
    ? sharedWorkspaces.slice(0, limit)
    : sharedWorkspaces;

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        {t('dashboard.sharedWithMe')}
      </Typography>
      {loading ? (
        // Display a loading spinner while fetching data
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='200px'
        >
          <CircularProgress />{' '}
          {/* You can replace this with a loading message if desired */}
        </Box>
      ) : displayedWorkspaces.length > 0 ? (
        <Grid container spacing={2}>
          {displayedWorkspaces.map((workspace) => (
            <Grid item xs={12} sm={6} md={4} key={workspace._id}>
              <WorkspaceCard workspace={workspace} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>{t('dashboard.noSharedWorkspaces')}</Typography>
      )}
    </Box>
  );
};

export default SharedWorkspaces;
