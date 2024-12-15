import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Modal,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ApiClient from '../../services/APIClient';
import { Add } from '@mui/icons-material';
import { Workspace } from '../../models/Workspace';

interface CreateWorkspaceFormProps {
  isSidebar?: boolean;
  parentId?: string;
}

const CreateWorkspaceForm: React.FC<CreateWorkspaceFormProps> = ({
  isSidebar = false,
  parentId = '',
}) => {
  const [workspaceName, setWorkspaceName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [parentWorkspaceId, setParentWorkspaceId] = useState(parentId);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (open) {
      const fetchWorkspaces = async () => {
        try {
          const response = await ApiClient.fetchAllWorkspaces();
          setWorkspaces(response.workspaces);
          console.log(response);
          console.log(workspaces);
        } catch (err) {
          console.error('Error fetching workspaces:', err);
        }
      };
      fetchWorkspaces();
    }
  }, [open]);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const data = await ApiClient.createWorkspace({
        workspaceName,
        description,
        isPublic,
        parentWorkspaceId: parentWorkspaceId || null,
      });
      navigate(`/workspace/${data._id}`);
      setDescription('');
      setWorkspaceName('');
      setIsPublic(true);
      setParentWorkspaceId('');
      handleClose();
    } catch (error) {
      console.error('Error creating workspace:', error);
      setError(`${t('workspace.workspaceCreateError')}`);
    }
  };

  return (
    <Box>
      {isSidebar ? (
        <ListItemButton id='sidebar-create-workspace' onClick={handleOpen}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary={t('workspace.createNewWorkspace')} />
        </ListItemButton>
      ) : (
        <Button variant='contained' onClick={handleOpen}>
          {t('workspace.createNewWorkspace')}
        </Button>
      )}

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            p: 4,
            backgroundColor: theme.palette.background.paper,
            margin: 'auto',
            maxWidth: 500,
            mt: 10,
            borderRadius: 2,
            boxShadow: 24,
          }}
        >
          <Typography variant='h4' gutterBottom>
            {t('workspace.createNewWorkspace')}
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label={t('workspace.workspaceName')}
              fullWidth
              margin='normal'
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              required
            />
            <TextField
              label={t('workspace.description')}
              fullWidth
              margin='normal'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <FormControl fullWidth margin='normal'>
              <InputLabel>{t('workspace.public')}</InputLabel>
              <Select
                label={t('workspace.public')}
                value={isPublic ? 'Yes' : 'No'}
                onChange={(e) => setIsPublic(e.target.value === 'Yes')}
              >
                <MenuItem value='Yes'>{t('workspace.yes')}</MenuItem>
                <MenuItem value='No'>{t('workspace.no')}</MenuItem>
              </Select>
            </FormControl>
            {workspaces && workspaces.length > 0 && (
              <FormControl fullWidth margin='normal'>
                <InputLabel>{t('workspace.parentWorkspace')}</InputLabel>
                <Select
                  label={t('workspace.parentWorkspace')}
                  value={parentWorkspaceId}
                  onChange={(e) => setParentWorkspaceId(e.target.value)}
                >
                  <MenuItem value=''>{t('workspace.none')}</MenuItem>
                  {workspaces.map((workspace) => (
                    <MenuItem key={workspace._id} value={workspace._id}>
                      {workspace.workspaceName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {error && (
              <Typography color='error' variant='body2' gutterBottom>
                {error}
              </Typography>
            )}
            <Box sx={{ mt: 2 }}>
              <Button type='submit' variant='contained' color='primary'>
                {t('workspace.createWorkspace')}
              </Button>
              <Button onClick={handleClose} sx={{ ml: 2 }}>
                {t('workspace.cancel')}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateWorkspaceForm;
