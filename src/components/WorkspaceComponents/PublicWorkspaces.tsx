import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  Box,
  CircularProgress,
  IconButton,
} from '@mui/material';
import ApiClient from '../../services/APIClient';
import { Workspace } from '../../models/Workspace';
import { useTranslation } from 'react-i18next';
import WorkspaceCard from './WorkspaceCard';
import { SkipNext, SkipPrevious } from '@mui/icons-material';

const PublicWorkspaces: React.FC = () => {
  const { t } = useTranslation();
  const [publicWorkspaces, setPublicWorkspaces] = useState<Workspace[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const fetchPublicWorkspaces = async () => {
      setLoading(true); // Start loading before fetching data
      try {
        const response = await ApiClient.getPublicWorkspaces(page);
        setPublicWorkspaces(response.workspaces);
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPublicWorkspaces();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography id='public-workspaces' variant='h6' gutterBottom>
          {t('dashboard.publicWorkspaces')}
        </Typography>
        {loading || publicWorkspaces.length == 0 || (
          <div id='pagination'>
            <IconButton onClick={handlePreviousPage} disabled={page === 1}>
              <SkipPrevious />
            </IconButton>
            <span>
              {t('pagination.page')} {page} {t('pagination.of')} {totalPages}
            </span>
            <IconButton onClick={handleNextPage} disabled={page === totalPages}>
              <SkipNext />
            </IconButton>
          </div>
        )}
      </Box>

      {loading ? (
        // Show loading spinner when fetching data
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='50vh'
        >
          <CircularProgress />
          <Typography variant='body1' sx={{ ml: 2 }}>
            {t('dashboard.loadingPublicWorkspaces')}{' '}
            {/* Add translation key for loading */}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {publicWorkspaces.length > 0 ? (
            publicWorkspaces.map((workspace) => (
              <Grid item xs={12} sm={6} md={4} key={workspace._id}>
                <WorkspaceCard workspace={workspace} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant='body1'>
                {t('dashboard.noPublicWorkspaces')}
              </Typography>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );
};

export default PublicWorkspaces;
