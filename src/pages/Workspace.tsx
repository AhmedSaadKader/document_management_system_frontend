import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  Input,
} from '@mui/material';
import DocumentPreviewModal from '../components/DocumentPreviewModal';
import DeleteDocumentButton from '../components/DeleteDocumentButton';

const WorkspacePage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const [workspace, setWorkspace] = useState<any>(null);
  const [newDocumentName, setNewDocumentName] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewName, setPreviewName] = useState('');

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAddDocument = async () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('documentName', newDocumentName);

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/workspaces/${workspaceId}/documents`,
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

      setWorkspace((prevWorkspace: any) => ({
        ...prevWorkspace,
        documents: [...prevWorkspace.documents, addedDocument.document],
      }));

      setNewDocumentName('');
      setSelectedFile(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownloadDocument = async (documentId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/workspaces/${workspaceId}/documents/${documentId}/download`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to download document');
      }

      // Extract the filename from the Content-Disposition header
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'downloaded-file.pdf';
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match) {
          filename = match[1];
        }
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
    }
  };
  const [previewUrl, setPreviewUrl] = useState('');

  const handlePreviewDocument = async (
    documentId: string,
    documentName: string
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/documents/${documentId}/preview`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch document preview');
      }

      const data = await response.json();

      if (data && data.base64) {
        // Decode base64 to binary data
        const binaryData = atob(data.base64);
        const arrayBuffer = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          arrayBuffer[i] = binaryData.charCodeAt(i);
        }

        // Create a Blob from the arrayBuffer
        const blob = new Blob([arrayBuffer], { type: 'application/pdf' });

        // Create a URL from the Blob
        const url = URL.createObjectURL(blob);

        setPreviewUrl(url);
        setPreviewName(documentName);
        setPreviewOpen(true);
      } else {
        console.error('No base64 data received');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDocumentDeleted = (documentId: string) => {
    setWorkspace((prevWorkspace: any) => ({
      ...prevWorkspace,
      documents: prevWorkspace.documents.filter(
        (document: any) => document._id !== documentId
      ),
    }));
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
          <Input type='file' onChange={handleFileChange} />
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
                      onClick={() => handleDownloadDocument(document._id)}
                      sx={{ mr: 1 }}
                    >
                      Download
                    </Button>
                    <Button
                      variant='outlined'
                      onClick={() =>
                        handlePreviewDocument(
                          document._id,
                          document.documentName
                        )
                      }
                      sx={{ mr: 1 }}
                    >
                      Preview
                    </Button>
                    <DeleteDocumentButton
                      documentId={document._id}
                      onDelete={handleDocumentDeleted}
                    />
                  </Paper>
                </Grid>
              ))
            ) : (
              <Typography sx={{ p: 2, ml: 5 }}>
                No documents available.
              </Typography>
            )}
          </Grid>
          <DocumentPreviewModal
            open={previewOpen}
            handleClose={() => setPreviewOpen(false)}
            documentUrl={previewUrl}
            documentName={previewName}
          />
        </>
      ) : (
        <Typography>Loading workspace...</Typography>
      )}
    </Box>
  );
};

export default WorkspacePage;
