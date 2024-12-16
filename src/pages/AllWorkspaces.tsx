import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Button,
  IconButton,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ApiClient from '../services/APIClient';
import WorkspaceCard from '../components/WorkspaceComponents/WorkspaceCard';
import { SkipPrevious, SkipNext } from '@mui/icons-material';

const AllWorkspacesPage = () => {
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      setLoading(true);
      try {
        const data = await ApiClient.fetchAllWorkspaces(page);
        setWorkspaces(data.workspaces);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaces();
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
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        {t('workspace.allWorkspaces')}
      </Typography>
      {loading ? (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='50vh'
        >
          <CircularProgress />
          <Typography variant='body1' sx={{ ml: 2 }}>
            {t('workspace.loadingWorkspaces')}{' '}
          </Typography>
        </Box>
      ) : workspaces.length > 0 ? (
        <>
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
          <Grid container spacing={3}>
            {workspaces.map((workspace) => (
              <Grid item xs={12} sm={6} md={4} key={workspace._id}>
                <WorkspaceCard workspace={workspace} />
              </Grid>
            ))}
          </Grid>
        </>
      ) : (
        <Typography variant='body2' color='textSecondary'>
          {t('workspace.noWorkspaces')}
        </Typography>
      )}
    </Box>
  );
};

export default AllWorkspacesPage;
