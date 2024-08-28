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
  // const handleViewDetails = async (documentId: string) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/api/v1/documents/${documentId}`,
  //       {
  //         method: 'GET',
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error('Failed to fetch document details');
  //     }

  //     const data = await response.json();
  //     setSelectedDocument(data);
  //     setModalOpen(true);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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

      onDetails(documentId);
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };

  return (
    <Button color='error' onClick={handleDetails}>
      View Details
    </Button>
  );
};

export default DetailsDocumentButton;
