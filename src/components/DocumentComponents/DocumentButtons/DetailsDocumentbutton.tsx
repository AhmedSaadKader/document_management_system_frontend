import React from 'react';
import { Button } from '@mui/material';

interface DetailsDocumentButtonProps {
  documentId: string;
  onDetails: (documentId: string) => void;
}

const DetailsDocumentButton = ({
  documentId,
  onDetails,
}: DetailsDocumentButtonProps) => {
  const handleDetails = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/documents/${documentId}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get document');
      }
      const data = await response.json();

      onDetails(data);
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };

  return (
    <Button color='primary' variant='outlined' onClick={handleDetails}>
      View Details
    </Button>
  );
};

export default DetailsDocumentButton;
