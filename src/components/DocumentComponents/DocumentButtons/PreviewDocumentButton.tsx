import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
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
  const [loading, setLoading] = useState(false); // Add loading state

  const handlePreviewDocument = async () => {
    setLoading(true); // Set loading to true when the preview starts
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

      // Handle content-disposition for streamed files (audio/video)
      const contentDisposition = response.headers.get('Content-Disposition');
      const fileType = response.headers.get('Content-Type') || '';

      // Handle streaming (audio/video)
      if (fileType.startsWith('audio/') || fileType.startsWith('video/')) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        // Pass the URL and MIME type to the onPreview handler
        onPreview(documentName, url, fileType);
        return;
      }

      // For base64 responses
      const data = await response.json();
      const { base64 } = data;

      if (base64) {
        let url = '';

        if (fileType.startsWith('image/')) {
          // Image preview (using base64)
          url = `data:${fileType};base64,${base64}`;
        } else if (fileType === 'application/pdf') {
          // PDF preview logic
          const binaryData = atob(base64);
          const arrayBuffer = new Uint8Array(binaryData.length);
          for (let i = 0; i < binaryData.length; i++) {
            arrayBuffer[i] = binaryData.charCodeAt(i);
          }

          const blob = new Blob([arrayBuffer], { type: 'application/pdf' });
          url = URL.createObjectURL(blob);
        }

        onPreview(documentName, url, fileType);
      } else {
        console.error('No base64 data received');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading to false once the file is loaded or an error occurs
    }
  };

  return (
    <Button
      onClick={handlePreviewDocument}
      sx={{ mr: 1 }}
      startIcon={loading ? <CircularProgress size={20} /> : <Preview />} // Show spinner when loading
      disabled={loading} // Disable the button while loading
    >
      {t('buttons.preview')}
    </Button>
  );
};

export default PreviewDocumentButton;
