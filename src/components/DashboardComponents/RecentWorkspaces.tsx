import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import ApiClient from '../../services/APIClient';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface RecentWorkspacesProps {
  limit?: number; // Add limit prop to control how many items are displayed
}

const RecentWorkspaces: React.FC<RecentWorkspacesProps> = ({ limit }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [recentWorkspaces, setRecentWorkspaces] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentWorkspaces = async () => {
      try {
        const data = await ApiClient.fetchRecentWorkspaces();
        setRecentWorkspaces(data);
      } catch (err) {
        setError(t('dashboard.errorFetchingRecentWorkspaces'));
      }
    };

    fetchRecentWorkspaces();
  }, [t]);

  if (error) return <Typography color='error'>{error}</Typography>;

  const handleWorkspaceClick = (workspaceId: string) => {
    navigate(`/workspace/${workspaceId}`);
  };

  // Use the limit prop to control how many workspaces are displayed
  const displayedWorkspaces = limit
    ? recentWorkspaces.slice(0, limit)
    : recentWorkspaces;

  return (
    <Box>
      <Typography variant='h6'>{t('dashboard.recentWorkspaces')}</Typography>
      <Box>
        {displayedWorkspaces.length > 0 ? (
          displayedWorkspaces.map((workspace) => (
            <Typography
              key={workspace._id}
              variant='subtitle1'
              onClick={() => handleWorkspaceClick(workspace._id)}
              sx={{
                cursor: 'pointer',
                mb: 1, // Add spacing between items
              }}
            >
              {workspace.workspaceName}
            </Typography>
          ))
        ) : (
          <Typography variant='body1'>
            {t('dashboard.noRecentWorkspaces')}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default RecentWorkspaces;
