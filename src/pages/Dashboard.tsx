import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { useAuth } from '../context/auth_context';

const Dashboard = () => {
  const { user } = useAuth();
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

    if (user) {
      fetchWorkspaces();
    }
  }, [user]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant='h6'>Recent Documents</Typography>
            {/* List recent documents here */}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant='h6'>Favorites</Typography>
            {/* List favorite documents here */}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant='h6'>Shared with Me</Typography>
            {/* List shared documents here */}
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant='h6'>My Workspaces</Typography>
            {workspaces.length > 0 ? (
              workspaces.map((workspace) => (
                <Box key={workspace._id} sx={{ mb: 2 }}>
                  <Typography variant='h6'>
                    {workspace.workspaceName}
                  </Typography>
                  <Typography variant='body2'>
                    {workspace.description}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography>No workspaces available.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
