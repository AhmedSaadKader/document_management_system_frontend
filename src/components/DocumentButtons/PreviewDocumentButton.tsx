import React from 'react';
import { Button } from '@mui/material';

interface PreviewDocumentButtonProps {
  documentId: string;
  documentName: string;
  onPreview: (documentName: string, url: string) => void;
}

const PreviewDocumentButton = ({
  documentId,
  documentName,
  onPreview,
}: PreviewDocumentButtonProps) => {
  const handlePreviewDocument = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/documents/${documentId}/preview`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch document preview');
      }

      const data = await response.json();

      if (data && data.base64) {
        const binaryData = atob(data.base64);
        const arrayBuffer = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          arrayBuffer[i] = binaryData.charCodeAt(i);
        }

        const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        onPreview(documentName, url);
      } else {
        console.error('No base64 data received');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button variant='outlined' onClick={handlePreviewDocument} sx={{ mr: 1 }}>
      Preview
    </Button>
  );
};

export default PreviewDocumentButton;
