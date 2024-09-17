// components/Sidebar.tsx
import React from 'react';
import {
  Box,
  List,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItemButton,
} from '@mui/material';
import { Work, DocumentScanner, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import DocumentFormModal from '../DocumentComponents/DocumentModals/DocumentFormModal';
import CreateWorkspaceForm from '../WorkspaceComponents/CreateWorkspaceForm';
import { useTranslation } from 'react-i18next';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        width: 240,
        position: 'fixed',
        left: 0,
        top: '64px',
        height: 'calc(100% - 64px)',
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        p: 2,
      }}
    >
      <List>
        <ListItemButton component={Link} to='/workspaces'>
          <ListItemIcon>
            <Work />
          </ListItemIcon>
          <ListItemText primary={t('appBar.workspaces')} />
        </ListItemButton>
        <ListItemButton component={Link} to='/documents'>
          <ListItemIcon>
            <DocumentScanner />
          </ListItemIcon>
          <ListItemText primary={t('appBar.documents')} />
        </ListItemButton>
        <ListItemButton component={Link} to='/recycle-bin'>
          <ListItemIcon>
            <Delete />
          </ListItemIcon>
          <ListItemText primary={t('appBar.recycleBin')} />
        </ListItemButton>
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
