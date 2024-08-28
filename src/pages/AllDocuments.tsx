import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import DeleteDocumentButton from '../components/DeleteDocumentButton';
import DocumentDetailsModal from '../components/DocumentDetailModal';

const AllDocumentsPage = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const queryParams = new URLSearchParams({
          search,
          sortBy,
          order,
        }).toString();

        const response = await fetch(
          `http://localhost:5000/api/v1/documents/filter?${queryParams}`,
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
  }, [search, sortBy, order]);

  const handleDocumentDeleted = (documentId: string) => {
    setDocuments((prevDocuments) =>
      prevDocuments.filter((document: any) => document._id !== documentId)
    );
  };

  const handleViewDetails = async (documentId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/documents/${documentId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch document details');
      }

      const data = await response.json();
      setSelectedDocument(data);
      setModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDocument(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        All Documents
      </Typography>

      {/* Search Input */}
      <TextField
        label='Search Documents'
        variant='outlined'
        fullWidth
        margin='normal'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Sort and Order */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl fullWidth variant='outlined'>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            label='Sort By'
          >
            <MenuItem value=''>None</MenuItem>
            <MenuItem value='documentName'>Document Name</MenuItem>
            <MenuItem value='createdAt'>Created At</MenuItem>
            <MenuItem value='updatedAt'>Updated At</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth variant='outlined'>
          <InputLabel>Order</InputLabel>
          <Select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            label='Order'
          >
            <MenuItem value='asc'>Ascending</MenuItem>
            <MenuItem value='desc'>Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {documents.length > 0 ? (
        documents.map((document) => (
          <Card
            sx={{
              mb: 2,
              transition: '0.3s',
              '&:hover': { boxShadow: 6 },
            }}
            key={document._id}
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
                color='primary'
                onClick={() => handleViewDetails(document._id)}
              >
                View Details
              </Button>
              <DeleteDocumentButton
                documentId={document._id}
                onDelete={handleDocumentDeleted}
              />
            </CardActions>
          </Card>
        ))
      ) : (
        <Typography variant='body2' color='textSecondary'>
          No documents available.
        </Typography>
      )}
      {selectedDocument && (
        <DocumentDetailsModal
          open={modalOpen}
          onClose={handleCloseModal}
          document={selectedDocument}
        />
      )}
    </Box>
  );
};

export default AllDocumentsPage;
