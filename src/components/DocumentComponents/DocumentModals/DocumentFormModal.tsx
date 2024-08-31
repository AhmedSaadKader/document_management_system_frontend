import React, { useState } from 'react';
import {
  Modal,
  Box,
  Button,
  TextField,
  Input,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

interface DocumentFormModalProps {
  workspaceId: string;
  onDocumentAdded: (newDocument: any) => void;
}

const DocumentFormModal: React.FC<DocumentFormModalProps> = ({
  workspaceId,
  onDocumentAdded,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState('');
  const { t } = useTranslation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAddDocument = async () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('documentName', documentName);

    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/workspaces/${workspaceId}/documents`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add document');
      }

      const addedDocument = await response.json();
      onDocumentAdded(addedDocument.document);
      setDocumentName('');
      setSelectedFile(null);
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button variant='contained' onClick={() => setOpen(true)}>
        {t('document.addDocument')}
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            p: 4,
            backgroundColor: 'white',
            margin: 'auto',
            maxWidth: 500,
            mt: 10,
          }}
        >
          <Typography variant='h6'>{t('document.addDocument')}</Typography>
          <TextField
            label={t('document.documentFormNameLabel')}
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            fullWidth
            margin='normal'
          />
          <Input type='file' onChange={handleFileChange} fullWidth />
          <Button
            variant='contained'
            onClick={handleAddDocument}
            sx={{ mt: 2 }}
          >
            {t('document.upload')}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default DocumentFormModal;
