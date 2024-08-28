import React from 'react';
import { Button } from '@mui/material';

interface DeleteDocumentButtonProps {
  documentId: string;
  onDelete: (documentId: string) => void;
}

const DeleteDocumentButton = ({
  documentId,
  onDelete,
}: DeleteDocumentButtonProps) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/documents/${documentId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete document');
      }

      onDelete(documentId);
      alert('Document deleted successfully');
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Error deleting document');
    }
  };

  return (
    <Button color='error' onClick={handleDelete}>
      Delete Document
    </Button>
  );
};

export default DeleteDocumentButton;
