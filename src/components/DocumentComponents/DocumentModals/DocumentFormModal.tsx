import React, { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Button,
  TextField,
  Input,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ApiClient from '../../../services/APIClient';
import { Add } from '@mui/icons-material';
import { useAuth } from '../../../context/auth_context';

interface DocumentFormModalProps {
  workspaceId?: string; // Optional prop to differentiate between dashboard and workspace page
  isSidebar: boolean;
  onDocumentAdded: (newDocument: any) => void;
}

const DocumentFormModal: React.FC<DocumentFormModalProps> = ({
  workspaceId = '',
  isSidebar = false,
  onDocumentAdded,
}) => {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const [selectedWorkspaceId, setSelectedWorkspaceId] =
    useState<string>(workspaceId);
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState('');
  const [tags, setTags] = useState<string>('');
  const { t } = useTranslation();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleWorkspaceChange = (event: SelectChangeEvent<string>) => {
    setSelectedWorkspaceId(event.target.value as string);
  };

  const handleAddDocument = async () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }
    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('documentName', documentName);
    formData.append('tags', tags);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/workspaces/${selectedWorkspaceId}/documents`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add document');
      }

      const addedDocument = await response.json();
      onDocumentAdded(addedDocument.document);
      setDocumentName('');
      setTags('');
      setSelectedFile(null);
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    if (!isAuthenticated || workspaceId) return; // Skip fetching workspaces if we're on the workspace page

    const fetchWorkspaces = async () => {
      try {
        const response = await ApiClient.fetchAllWorkspaces();
        setWorkspaces(response.workspaces);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWorkspaces();
  }, [isAuthenticated, workspaceId]);

  return (
    <>
      {isSidebar ? (
        <ListItemButton onClick={() => setOpen(true)}>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary={t('document.addDocument')} />
        </ListItemButton>
      ) : (
        <Button variant='contained' onClick={() => setOpen(true)}>
          {t('document.addDocument')}
        </Button>
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            p: 4,
            backgroundColor: theme.palette.background.paper,
            margin: 'auto',
            maxWidth: 500,
            mt: 10,
          }}
        >
          <Typography variant='h6'>{t('document.addDocument')}</Typography>
          <Box height={10} />
          {/* Only show workspace selection if no workspaceId is provided */}
          {!workspaceId && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>{t('document.selectWorkspace')}</InputLabel>
              <Box height={8} />
              <Select
                value={selectedWorkspaceId}
                onChange={handleWorkspaceChange}
              >
                {workspaces.map((workspace) => (
                  <MenuItem key={workspace._id} value={workspace._id}>
                    {workspace.workspaceName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {selectedWorkspaceId && (
            <>
              <TextField
                label={t('document.documentFormNameLabel')}
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                fullWidth
                margin='normal'
              />
              <TextField
                label='Tags (comma-separated)'
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                fullWidth
                margin='normal'
              />
              <Input type='file' onChange={handleFileChange} fullWidth />
              <Button
                variant='contained'
                onClick={handleAddDocument}
                sx={{ mt: 2 }}
                disabled={isLoading}
              >
                {isLoading ? t('document.uploading') : t('document.upload')}
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default DocumentFormModal;
