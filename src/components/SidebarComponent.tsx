import React from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  useMediaQuery,
} from '@mui/material';
import {
  Work,
  DocumentScanner,
  Delete,
  ExpandMore,
  Favorite,
  Share,
  Dashboard,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import DocumentFormModal from './DocumentComponents/DocumentModals/DocumentFormModal';
import CreateWorkspaceForm from './WorkspaceComponents/CreateWorkspaceForm';
import { useTranslation } from 'react-i18next';

const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const isMdUp = useMediaQuery((theme: any) => theme.breakpoints.up('md')); // 'md' breakpoint

  return (
    <Box
      id='sidebar'
      sx={{
        width: 240,
        position: 'fixed',
        left: 0,
        top: isMdUp ? '64px' : 0,
        height: 'calc(100% - 64px)',
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        p: 2,
        overflowY: 'auto',
      }}
    >
      <List>
        <ListItemButton component={Link} to='/dashboard'>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary={t('dashboard.title')} />
        </ListItemButton>
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

      <Divider sx={{ my: 2 }} />

      <ListItemButton component={Link} to='/favorites'>
        <ListItemIcon>
          <Favorite />
        </ListItemIcon>
        <ListItemText>{t('dashboard.favorites')}</ListItemText>
      </ListItemButton>

      <ListItemButton component={Link} to='/shared-workspaces'>
        <ListItemIcon>
          <Share />
        </ListItemIcon>
        <ListItemText>{t('dashboard.sharedWithMe')}</ListItemText>
      </ListItemButton>
    </Box>
  );
};

export default Sidebar;
