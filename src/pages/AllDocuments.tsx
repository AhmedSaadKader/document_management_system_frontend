import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import DocumentList from '../components/DocumentComponents/DocumentList';
import DocumentSearchFilter from '../components/DocumentComponents/DocumentSearchFilter';
import { useTranslation } from 'react-i18next';
import ApiClient from '../services/APIClient';

const AllDocumentsPage = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const { t } = useTranslation();

  const updateSearchFilters = (
    e: { target: { value: React.SetStateAction<string> } },
    state: string
  ) => {
    if (state == 'search') {
      setSearch(e.target.value);
    } else if (state == 'sort') {
      setSortBy(e.target.value);
    } else if (state == 'order') {
      if (e.target.value == 'asc' || e.target.value == 'desc')
      setOrder(e.target.value);
    }
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await ApiClient.fetchDocuments({
          search,
          sortBy,
          order,
        });
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
        {t('document.allDocuments')}
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
