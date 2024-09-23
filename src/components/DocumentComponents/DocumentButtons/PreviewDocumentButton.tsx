import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Preview } from '@mui/icons-material';

interface PreviewDocumentButtonProps {
  documentId: string;
  documentName: string;
  onPreview: (documentName: string, url: string, mimeType: string) => void;
}

const PreviewDocumentButton = ({
  documentId,
  documentName,
  onPreview,
}: PreviewDocumentButtonProps) => {
  const { t } = useTranslation();

  const handlePreviewDocument = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/documents/${documentId}/preview`,
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
      console.log(data);

      // Assuming the API returns a MIME type and base64 string
      const { base64, fileType } = data;

      if (base64) {
        if (fileType.startsWith('image/')) {
          // For images, directly create the URL from base64
          const url = `data:${fileType};base64,${base64}`;
          onPreview(documentName, url, fileType);
        } else if (fileType === 'application/pdf') {
          // For PDFs, convert base64 to blob
          const binaryData = atob(base64);
          const arrayBuffer = new Uint8Array(binaryData.length);
          for (let i = 0; i < binaryData.length; i++) {
            arrayBuffer[i] = binaryData.charCodeAt(i);
          }

          const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          onPreview(documentName, url, fileType);
        } else if (fileType.startsWith('video/')) {
          // For videos, create a URL directly from base64
          const url = `data:${fileType};base64,${base64}`;
          onPreview(documentName, url, fileType);
        } else if (fileType.startsWith('audio/')) {
          // For audio, create a URL directly from base64
          const url = `data:${fileType};base64,${base64}`;
          onPreview(documentName, url, fileType);
        } else {
          console.error('Unsupported file type');
        }
      } else {
        console.error('No base64 data received');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      onClick={handlePreviewDocument}
      sx={{ mr: 1 }}
      startIcon={<Preview />}
    >
      {t('buttons.preview')}
    </Button>
  );
};

export default PreviewDocumentButton;
