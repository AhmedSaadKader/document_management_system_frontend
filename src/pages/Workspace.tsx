import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Paper, Button, TextField } from '@mui/material';

const WorkspacePage = () => {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [workspace, setWorkspace] = useState<any>(null);
  const [newDocumentName, setNewDocumentName] = useState('');

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/workspaces/${workspaceId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch workspace');
        }

        const data = await response.json();
        setWorkspace(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWorkspace();
  }, [workspaceId]);

  const handleAddDocument = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/workspaces/${workspaceId}/documents`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newDocumentName }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add document');
      }

      // Fetch workspace again to update the document list
      const addedDocument = await response.json();

      setWorkspace((prevWorkspace: any) => ({
        ...prevWorkspace,
        documents: [...prevWorkspace.documents, addedDocument],
      }));
      setNewDocumentName('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteDocument = async (documentId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/workspaces/${workspaceId}/documents/${documentId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete document');
      }

      // Fetch workspace again to update the document list
      // const updatedWorkspace = await response.json();
      setWorkspace((prevWorkspace: any) => ({
        ...prevWorkspace,
        documents: prevWorkspace.documents.filter(
          (doc: any) => doc._id !== documentId
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {workspace ? (
        <>
          <Typography variant='h4' gutterBottom>
            {workspace.workspaceName}
          </Typography>
          <Typography variant='body1' gutterBottom>
            {workspace.description}
          </Typography>
          <TextField
            label='New Document Name'
            value={newDocumentName}
            onChange={(e) => setNewDocumentName(e.target.value)}
            fullWidth
          />
          <Button
            variant='contained'
            onClick={handleAddDocument}
            sx={{ mt: 2 }}
          >
            Add Document
          </Button>
          <Grid container spacing={3} sx={{ mt: 3 }}>
            {workspace.documents.length > 0 ? (
              workspace.documents.map((document: any) => (
                <Grid item xs={12} sm={6} md={4} key={document._id}>
                  <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant='h6'>
                      {document.documentName}
                    </Typography>
                    <Button
                      variant='outlined'
                      // onClick={() => /* Open document logic */}
                      sx={{ mr: 1 }}
                    >
                      Open
                    </Button>
                    <Button
                      variant='outlined'
                      color='error'
                      onClick={() => handleDeleteDocument(document._id)}
                    >
                      Delete
                    </Button>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Typography>No documents available.</Typography>
            )}
          </Grid>
        </>
      ) : (
        <Typography>Loading workspace...</Typography>
      )}
    </Box>
  );
};

export default WorkspacePage;
