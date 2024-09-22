import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Delete, Restore } from '@mui/icons-material';
import ApiClient from '../services/APIClient';

const RecycleBinPage = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await ApiClient.fetchRecycleBin();
        setDocuments(data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchWorkspaces = async () => {
      try {
        const data = await ApiClient.fetchDeletedWorkspaces();
        setWorkspaces(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDocuments();
    fetchWorkspaces();
  }, []);

  async function restoreDocument(documentId: string) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/documents/${documentId}/restore`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to restore document');
      }

      setDocuments(documents.filter((doc) => doc._id !== documentId));
    } catch (error) {
      console.error(error);
    }
  }

  async function permanentlyDeleteDocument(documentId: string) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/documents/${documentId}/delete`,
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

      setDocuments(documents.filter((doc) => doc._id !== documentId));
    } catch (error) {
      console.error(error);
    }
  }

  async function restoreWorkspace(workspaceId: string) {
    try {
      await ApiClient.restoreWorkspace(workspaceId);
      setWorkspaces(workspaces.filter((ws) => ws._id !== workspaceId));
    } catch (error) {
      console.error(error);
    }
  }

  async function permanentlyDeleteWorkspace(workspaceId: string) {
    try {
      await ApiClient.permanentlyDeleteWorkspace(workspaceId);
      setWorkspaces(workspaces.filter((ws) => ws._id !== workspaceId));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        {t('recycleBin.recycleBin')}
      </Typography>
      <Typography variant='h5' gutterBottom>
        Documents
      </Typography>
      {documents.length > 0 ? (
        documents.map((document) => (
          <Card
            key={document._id}
            sx={{
              mb: 2,
              transition: '0.3s',
              '&:hover': { boxShadow: 6 },
            }}
          >
            <CardContent>
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                {document.documentName}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                {document.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<Restore />}
                size='small'
                color='secondary'
                onClick={() => restoreDocument(document._id)}
              >
                {t('recycleBin.restore')}
              </Button>
              <Button
                startIcon={<Delete />}
                size='small'
                color='error'
                onClick={() => permanentlyDeleteDocument(document._id)}
              >
                {t('recycleBin.deletePremanently')}
              </Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography variant='body2' color='textSecondary'>
          {t('recycleBin.noDocumentInRecycleBin')}
        </Typography>
      )}
      <Typography variant='h5' gutterBottom>
        Workspaces
      </Typography>
      {workspaces.length > 0 ? (
        workspaces.map((workspace) => (
          <Card
            key={workspace._id}
            sx={{
              mb: 2,
              transition: '0.3s',
              '&:hover': { boxShadow: 6 },
            }}
          >
            <CardContent>
              <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
                {workspace.workspaceName}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                {workspace.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<Restore />}
                size='small'
                color='secondary'
                onClick={() => restoreWorkspace(workspace._id)}
              >
                {t('recycleBin.restore')}
              </Button>
              <Button
                startIcon={<Delete />}
                size='small'
                color='error'
                onClick={() => permanentlyDeleteWorkspace(workspace._id)}
              >
                {t('recycleBin.deletePremanently')}
              </Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography variant='body2' color='textSecondary'>
          {t('recycleBin.noDocumentInRecycleBin')}
        </Typography>
      )}
    </Box>
  );
};

export default RecycleBinPage;
