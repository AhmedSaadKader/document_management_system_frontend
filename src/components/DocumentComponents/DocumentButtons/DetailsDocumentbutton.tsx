import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Info } from '@mui/icons-material';
import ApiClient from '../../../services/APIClient';

interface DetailsDocumentButtonProps {
  documentId: string;
  onDetails: (documentId: string) => void;
}

const DetailsDocumentButton = ({
  documentId,
  onDetails,
}: DetailsDocumentButtonProps) => {
  const { t } = useTranslation();

  const handleDetails = async () => {
    try {
      const data = await ApiClient.fetchDocumentDetails(documentId);
      onDetails(data);
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };

  return (
    <Button color='primary' onClick={handleDetails} startIcon={<Info />}>
      {t('buttons.details')}
    </Button>
  );
};

export default DetailsDocumentButton;
