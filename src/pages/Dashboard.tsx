import React from 'react';
import { Box, Typography, Grid, Paper, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {
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
