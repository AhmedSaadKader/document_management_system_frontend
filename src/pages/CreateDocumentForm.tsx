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
import DocumentForm from '../components/DocumentForm';

const DocumentCreatePage = () => {
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>('');

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/v1/workspaces',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch workspaces');
        }

        const data = await response.json();
        setWorkspaces(data);
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
        Create New Document
      </Typography>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Workspace</InputLabel>
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
