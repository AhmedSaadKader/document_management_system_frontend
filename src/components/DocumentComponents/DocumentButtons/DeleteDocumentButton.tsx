import React from 'react';
import { Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import ApiClient from '../../../services/APIClient';

interface DeleteDocumentButtonProps {
  documentId: string;
  onDelete: (documentId: string) => void;
}

const DeleteDocumentButton = ({
  documentId,
  onDelete,
}: DeleteDocumentButtonProps) => {
  const { t } = useTranslation();

  const handleDelete = async () => {
    try {
      await ApiClient.deleteDocument(documentId);

      onDelete(documentId);
      alert('Document deleted successfully');
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Error deleting document');
    }
  };

  return (
    <Button color='error' onClick={handleDelete} startIcon={<Delete />}>
      {t('buttons.delete')}
    </Button>
  );
};

export default DeleteDocumentButton;
