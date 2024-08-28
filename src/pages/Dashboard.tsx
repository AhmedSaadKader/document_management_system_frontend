import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { useAuth } from '../context/auth_context';
import { Link } from 'react-router-dom';

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
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='h6'>Workspaces</Typography>
              <Button color='inherit' href='/create-workspace'>
                Create Workspace
              </Button>
              <Button color='inherit' component={Link} to='/workspaces'>
                All Workspaces
              </Button>
            </Box>
            {/* 
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
            )} */}
          </Paper>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='h6'>Documents</Typography>
              <Button color='inherit' href='/create-document'>
                Create Document
              </Button>
              <Button color='inherit' component={Link} to='/documents'>
                All Documents
              </Button>
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Button color='inherit' component={Link} to='/recycle-bin'>
              Recycle Bin
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
