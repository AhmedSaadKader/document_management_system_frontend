import React, { useState } from 'react';
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Share } from '@mui/icons-material';

interface ShareWorkspaceModalProps {
  workspaceId: string;
}

const ShareWorkspaceModal: React.FC<ShareWorkspaceModalProps> = ({
  workspaceId,
}) => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [permission, setPermission] = useState('viewer');
  const { t } = useTranslation();

  const handleShare = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/workspaces/${workspaceId}/share`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, permission }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to share workspace');
      }

      setOpen(false);
      setEmail('');
      setPermission('viewer');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <Share />
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            p: 4,
            backgroundColor: 'background.paper',
            margin: 'auto',
            maxWidth: 500,
            mt: 10,
          }}
        >
          <Typography variant='h6'>{t('workspace.shareWorkspace')}</Typography>
          <TextField
            label={t('workspace.enterEmail')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin='normal'
          />
          <FormControl fullWidth margin='normal'>
            <InputLabel>{t('workspace.permission')}</InputLabel>
            <Select
              value={permission}
              onChange={(e) => setPermission(e.target.value)}
              label={t('workspace.permission')}
            >
              <MenuItem value='viewer'>{t('workspace.viewer')}</MenuItem>
              <MenuItem value='editor'>{t('workspace.editor')}</MenuItem>
            </Select>
          </FormControl>
          <Button variant='contained' onClick={handleShare} sx={{ mt: 2 }}>
            {t('workspace.share')}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default ShareWorkspaceModal;
