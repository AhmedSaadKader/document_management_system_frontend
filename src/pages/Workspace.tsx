import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import WorkspaceHeader from '../components/WorkspaceHeader';
import DocumentForm from '../components/DocumentForm';
import DocumentList from '../components/DocumentList';
import DocumentPreviewModal from '../components/DocumentModals/DocumentPreviewModal';

const WorkspacePage: React.FC = () => {
  const [workspace, setWorkspace] = useState<any>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [previewName, setPreviewName] = useState('');
  const { workspaceId } = useParams<{ workspaceId: string }>();

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

  const onDocumentAdded = (newDocument: any) => {
    setWorkspace((prevWorkspace: any) => ({
      ...prevWorkspace,
      documents: [...prevWorkspace.documents, newDocument],
    }));
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
        const binaryData = atob(data.base64);
        const arrayBuffer = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          arrayBuffer[i] = binaryData.charCodeAt(i);
        }

        const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
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
          <WorkspaceHeader
            workspaceName={workspace.workspaceName}
            description={workspace.description}
          />
          <DocumentForm
            workspaceId={workspaceId!}
            onDocumentAdded={onDocumentAdded}
          />
          <Grid container spacing={3} sx={{ mt: 3, mx: 1 }}>
            <DocumentList
              documents={workspace.documents}
              onDownload={handleDownloadDocument}
              onPreview={handlePreviewDocument}
              onDelete={handleDocumentDeleted}
            />
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
