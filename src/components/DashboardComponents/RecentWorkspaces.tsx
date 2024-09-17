import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import ApiClient from '../../services/APIClient';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const RecentWorkspaces: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [recentWorkspaces, setRecentWorkspaces] = useState<any[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentWorkspaces = async () => {
      try {
        const data = await ApiClient.fetchRecentWorkspaces();
        setRecentWorkspaces(data);
      } catch (err) {
        setError('Failed to fetch recent workspaces');
      }
    };

    fetchRecentWorkspaces();
  }, []);

  if (error) return <Typography color='error'>{error}</Typography>;

  const handleWorkspaceClick = (workspaceId: string) => {
    navigate(`/workspace/${workspaceId}`);
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant='h6'> {t('dashboard.recentWorkspaces')}</Typography>
      <Box>
        {recentWorkspaces.map((workspace) => (
          <Box key={workspace._id}>
            <Typography
              variant='subtitle1'
              onClick={() => handleWorkspaceClick(workspace._id)}
              sx={{
                cursor: 'pointer',
              }}
            >
              {workspace.workspaceName}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default RecentWorkspaces;
