import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import DocumentList from '../components/DocumentList';
import DocumentSearchFilter from '../components/DocumentSearchFilter';

const AllDocumentsPage = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('asc');

  const updateSearchFilters = (
    e: { target: { value: React.SetStateAction<string> } },
    state: string
  ) => {
    if (state == 'search') {
      setSearch(e.target.value);
    } else if (state == 'sort') {
      setSortBy(e.target.value);
    } else if (state == 'order') {
      setOrder(e.target.value);
    }
  };

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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h4' gutterBottom>
        All Documents
      </Typography>
      <DocumentSearchFilter
        search={search}
        sortBy={sortBy}
        order={order}
        updateSearchFilters={updateSearchFilters}
      />
      <Grid container spacing={3} sx={{ mt: 3, mx: 1 }}>
        <DocumentList documents={documents} onDelete={handleDocumentDeleted} />
      </Grid>
    </Box>
  );
};

export default AllDocumentsPage;
