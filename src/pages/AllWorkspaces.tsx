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

const AllWorkspacesPage = () => {
  const [workspaces, setWorkspaces] = useState<any[]>([]);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/v1/workspaces',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch workspaces');
        }

        const data = await response.json();
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
        All Workspaces
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
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Link>
        ))
      ) : (
        <Typography variant='body2' color='textSecondary'>
          No workspaces available.
        </Typography>
      )}
    </Box>
  );
};

export default AllWorkspacesPage;
