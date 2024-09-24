import React, { useState } from 'react';
import { Button, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Preview } from '@mui/icons-material';
import DocumentPreviewModal from '../DocumentModals/DocumentPreviewModal';
import { Document } from '../../../models/Document';

interface PreviewDocumentButtonProps {
  document: Document;
}

const PreviewDocumentButton = ({ document }: PreviewDocumentButtonProps) => {
  const documentId = document._id;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [previewName, setPreviewName] = useState('');

  const handlePreviewDocument = async () => {
    setLoading(true);
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
      // const contentDisposition = response.headers.get('Content-Disposition');
      // const fileType = response.headers.get('Content-Type') || '';
      const fileType = document.fileType;
      console.log(fileType);

      // Handle streaming (audio/video)
      if (fileType.startsWith('audio/') || fileType.startsWith('video/')) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);

        setPreviewUrl(url);
        setPreviewName(document.documentName);
        setPreviewOpen(true);
        setLoading(false);

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
          setPreviewUrl(url);
          setPreviewName(document.documentName);
          setPreviewOpen(true);
          setLoading(false);
        }
        setPreviewUrl(url);
        setPreviewName(document.documentName);
        setPreviewOpen(true);
        setLoading(false);
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
    <>
      <Button
        onClick={handlePreviewDocument}
        sx={{ mr: 1 }}
        startIcon={loading ? <CircularProgress size={20} /> : <Preview />} // Show spinner when loading
        disabled={loading} // Disable the button while loading
      >
        {t('buttons.preview')}
      </Button>
      {previewOpen && (
        <DocumentPreviewModal
          open={previewOpen}
          handleClose={() => setPreviewOpen(false)}
          documentUrl={previewUrl}
          documentName={previewName}
          fileType={document.fileType}
        />
      )}
    </>
  );
};

export default PreviewDocumentButton;
