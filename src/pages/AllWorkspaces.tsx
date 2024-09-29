import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, CircularProgress, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ApiClient from '../services/APIClient';
import WorkspaceCard from '../components/WorkspaceComponents/WorkspaceCard';

const AllWorkspacesPage = () => {
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const data = await ApiClient.fetchAllWorkspaces();
        setWorkspaces(data.workspaces);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false after fetching
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
        // Display loading spinner while fetching data
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='50vh'
        >
          <CircularProgress />
          <Typography variant='body1' sx={{ ml: 2 }}>
            {t('workspace.loadingWorkspaces')}{' '}
            {/* Add translation key for loading */}
          </Typography>
        </Box>
      ) : workspaces.length > 0 ? (
        <>
          <div>
            <Button onClick={handlePreviousPage} disabled={page === 1}>
              {t('pagination.previous')}
            </Button>
            <span>
              {t('pagination.page')} {page} {t('pagination.of')} {totalPages}
            </span>
            <Button onClick={handleNextPage} disabled={page === totalPages}>
              {t('pagination.next')}
            </Button>
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
