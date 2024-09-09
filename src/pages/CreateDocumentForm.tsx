import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import DocumentForm from '../components/DocumentComponents/DocumentModals/DocumentFormModal';
import { useTranslation } from 'react-i18next';
import ApiClient from '../services/APIClient';

const DocumentCreatePage = () => {
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>('');
  const { t } = useTranslation();

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await ApiClient.fetchAllWorkspaces();

        console.log(response);
        setWorkspaces(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWorkspaces();
  }, []);

  const handleWorkspaceChange = (event: SelectChangeEvent<string>) => {
    setSelectedWorkspaceId(event.target.value as string);
  };

  const handleDocumentAdded = (newDocument: any) => {
    console.log('New Document Added:', newDocument);
    // Handle the newly added document if needed
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        {t('document.createNewDocument')}
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>{t('document.selectWorkspace')}</InputLabel>
        <Box height={8} />
        <Select value={selectedWorkspaceId} onChange={handleWorkspaceChange}>
          {workspaces.map((workspace) => (
            <MenuItem key={workspace._id} value={workspace._id}>
              {workspace.workspaceName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedWorkspaceId && (
        <DocumentForm
          workspaceId={selectedWorkspaceId}
          onDocumentAdded={handleDocumentAdded}
        />
      )}
    </Box>
  );
};

export default DocumentCreatePage;
