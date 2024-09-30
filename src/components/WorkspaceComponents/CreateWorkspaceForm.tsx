import React, { useState } from 'react';
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

interface CreateWorkspaceFormProps {
  isSidebar: boolean;
}

const CreateWorkspaceForm: React.FC<CreateWorkspaceFormProps> = ({
  isSidebar = false,
}) => {
  const [workspaceName, setWorkspaceName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const data = await ApiClient.createWorkspace({
        workspaceName,
        description,
        isPublic,
      });
      navigate(`/workspace/${data._id}`);
      setWorkspaceName('');
      setDescription('');
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
