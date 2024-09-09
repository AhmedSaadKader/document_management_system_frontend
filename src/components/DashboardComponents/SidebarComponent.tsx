// components/Sidebar.tsx
import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Home,
  Work,
  Star,
  Share,
  Folder,
  DocumentScanner,
  Delete,
  Add,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <Box
      sx={{
        width: 240,
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        p: 2,
      }}
    >
      <Typography variant='h6' sx={{ mb: 2 }}>
        Dashboard
      </Typography>
      <List>
        <ListItem button component={Link} to='/workspaces'>
          <ListItemIcon>
            <Work />
          </ListItemIcon>
          <ListItemText primary='Workspaces' />
        </ListItem>
        <ListItem button component={Link} to='/documents'>
          <ListItemIcon>
            <DocumentScanner />
          </ListItemIcon>
          <ListItemText primary='Documents' />
        </ListItem>
        <ListItem button component={Link} to='/shared'>
          <ListItemIcon>
            <Share />
          </ListItemIcon>
          <ListItemText primary='Shared Workspaces' />
        </ListItem>
        <ListItem button component={Link} to='/favorites'>
          <ListItemIcon>
            <Star />
          </ListItemIcon>
          <ListItemText primary='Favorites' />
        </ListItem>
        <ListItem button component={Link} to='/recycle-bin'>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary='Recycle Bin' />
        </ListItem>
      </List>
      <Divider sx={{ my: 2 }} />
      <List>
        <ListItem button component={Link} to='/create-workspace'>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary='Create Workspace' />
        </ListItem>
        <ListItem button component={Link} to='/create-document'>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary='Add Document' />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
