import React, { useState } from 'react';
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ApiClient from '../../services/APIClient';
import { Workspace } from '../../models/Workspace';

interface EditWorkspaceModalProps {
  workspace: Workspace;
}

const EditWorkspaceModal: React.FC<EditWorkspaceModalProps> = ({
  workspace,
}) => {
  const [open, setOpen] = useState(false);
  const [workspaceName, setWorkspaceName] = useState(workspace.workspaceName);
  const [description, setDescription] = useState(workspace.description || '');
  const [isPublic, setIsPublic] = useState(workspace.isPublic);
  const { t } = useTranslation();

  const handleSave = async () => {
    try {
      const response: Workspace = await ApiClient.editWorkspace(workspace._id, {
        workspaceName,
        description,
        isPublic,
      });

      // Update workspace state with response data
      workspace.workspaceName = response.workspaceName;
      workspace.description = response.description;
      workspace.isPublic = response.isPublic; // Make sure to update the public status
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button variant='contained' onClick={() => setOpen(true)}>
        {t('workspace.edit')}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            p: 4,
            backgroundColor: 'background.paper',
            margin: 'auto',
            maxWidth: 500,
            mt: 10,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography variant='h6'>{t('workspace.editWorkspace')}</Typography>
          <TextField
            label={t('workspace.workspaceName')}
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
            fullWidth
            margin='normal'
          />
          <TextField
            label={t('workspace.description')}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin='normal'
            multiline
            rows={3}
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
          <Button variant='contained' onClick={handleSave} sx={{ mt: 2 }}>
            {t('workspace.save')}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default EditWorkspaceModal;
