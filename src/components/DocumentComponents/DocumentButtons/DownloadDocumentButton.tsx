import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Download } from '@mui/icons-material';

interface DownloadDocumentButtonProps {
  documentId: string;
  workspaceId: string;
}

const DownloadDocumentButton = ({
  documentId,
}: DownloadDocumentButtonProps) => {
  const { t } = useTranslation();

  const handleDownload = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/documents/${documentId}/download`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to download document');
      }

      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'downloaded-file.pdf';
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match) {
          filename = match[1];
        }
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button onClick={handleDownload} sx={{ mr: 1 }} startIcon={<Download />}>
      {t('buttons.download')}
    </Button>
  );
};

export default DownloadDocumentButton;
