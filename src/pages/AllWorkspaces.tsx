import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ApiClient from '../services/APIClient';

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
          <Link
            to={`/workspace/${workspace._id}`}
            key={workspace._id}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Card
              sx={{
                mb: 2,
                transition: '0.3s',
                '&:hover': { boxShadow: 6 },
              }}
            >
              <CardContent>
                <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                  {workspace.workspaceName}
                </Typography>
                <Typography variant='body2' color='textSecondary'>
                  {workspace.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small' color='primary'>
                  {t('workspace.viewDetails')}
                </Button>
              </CardActions>
            </Card>
          </Link>
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
