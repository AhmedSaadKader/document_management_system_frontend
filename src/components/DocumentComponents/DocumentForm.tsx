import React, { useState } from 'react';
import { Button, TextField, Input } from '@mui/material';

interface DocumentFormProps {
  workspaceId: string;
  onDocumentAdded: (newDocument: any) => void;
}

const DocumentForm: React.FC<DocumentFormProps> = ({
  workspaceId,
  onDocumentAdded,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentName, setDocumentName] = useState('');

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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TextField
        label='New Document Name'
        value={documentName}
        onChange={(e) => setDocumentName(e.target.value)}
        fullWidth
      />
      <Input type='file' onChange={handleFileChange} />
      <Button variant='contained' onClick={handleAddDocument} sx={{ mt: 2 }}>
        Add Document
      </Button>
    </>
  );
};

export default DocumentForm;
