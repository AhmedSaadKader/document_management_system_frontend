import React, { useEffect, useState } from 'react';
import { Typography, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ApiClient from '../../services/APIClient';

const SharedWorkspaces: React.FC<any> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [sharedWorkspaces, setSharedWorkspaces] = useState<any[]>([]);

  const handleWorkspaceClick = (workspaceId: string) => {
    navigate(`/workspace/${workspaceId}`);
  };

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

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant='h6'>{t('dashboard.sharedWithMe')}</Typography>
      {sharedWorkspaces.length > 0 ? (
        sharedWorkspaces.map((workspace) => (
          <Typography
            key={workspace._id}
            onClick={() => handleWorkspaceClick(workspace._id)}
            sx={{
              cursor: 'pointer',
            }}
          >
            {workspace.workspaceName}
          </Typography>
        ))
      ) : (
        <Typography>{t('dashboard.noSharedWorkspaces')}</Typography>
      )}
    </Paper>
  );
};

export default SharedWorkspaces;
