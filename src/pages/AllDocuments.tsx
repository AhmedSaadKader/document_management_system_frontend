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

const AllDocumentsPage = () => {
  const [documents, setDocuments] = useState<any[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/documents', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        });

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
        All Documents
      </Typography>
      {documents.length > 0 ? (
        documents.map((document) => (
          <Link
            to={`/document/${document._id}`}
            key={document._id}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Card
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
                <Button size='small' color='primary'>
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Link>
        ))
      ) : (
        <Typography variant='body2' color='textSecondary'>
          No documents available.
        </Typography>
      )}
    </Box>
  );
};

export default AllDocumentsPage;
