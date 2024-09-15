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
import { Work, DocumentScanner, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import DocumentFormModal from '../DocumentComponents/DocumentModals/DocumentFormModal';
import CreateWorkspaceForm from '../WorkspaceComponents/CreateWorkspaceForm';

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
        <ListItem button component={Link} to='/recycle-bin'>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary='Recycle Bin' />
        </ListItem>
      </List>
      <Divider sx={{ my: 2 }} />
      <List>
        <CreateWorkspaceForm isSidebar={true} />
        <DocumentFormModal
          isSidebar={true}
          onDocumentAdded={function (): void {
            throw new Error('Function not implemented.');
          }}
          workspaceId={''}
        />
      </List>
    </Box>
  );
};

export default Sidebar;
