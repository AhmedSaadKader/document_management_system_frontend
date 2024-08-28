import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

const RecycleBinPage = () => {
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/api/v1/documents/recycle-bin',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('authToken')}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch documents');
        }

        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        Recycle Bin
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
                size='small'
                component={Link}
                to={`/document/${document._id}`}
              >
                View Details
              </Button>
              <Button
                size='small'
                color='secondary'
                onClick={() => restoreDocument(document._id)}
              >
                Restore
              </Button>
              <Button
                size='small'
                color='error'
                onClick={() => permanentlyDeleteDocument(document._id)}
              >
                Delete Permanently
              </Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography variant='body2' color='textSecondary'>
          No documents in the recycle bin.
        </Typography>
      )}
    </Box>
  );

  async function restoreDocument(documentId: string) {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/documents/${documentId}/restore`,
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
        `http://localhost:5000/api/v1/documents/${documentId}/delete`,
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
};

export default RecycleBinPage;
