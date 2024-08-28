import React from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import DeleteDocumentButton from './DocumentButtons/DeleteDocumentButton';

interface Document {
  _id: string;
  documentName: string;
}

interface DocumentListProps {
  documents: Document[];
  onDownload: (documentId: string) => void;
  onPreview: (documentId: string, documentName: string) => void;
  onDelete: (documentId: string) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onDownload,
  onPreview,
  onDelete,
}) => {
  return (
    <Grid container spacing={3} sx={{ mr: 3 }}>
      {documents.length > 0 ? (
        documents.map((document) => (
          <Grid item xs={12} sm={6} md={4} key={document._id}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant='h6'>{document.documentName}</Typography>
              <Button
                variant='outlined'
                onClick={() => onDownload(document._id)}
                sx={{ mr: 1 }}
              >
                Download
              </Button>
              <Button
                variant='outlined'
                onClick={() => onPreview(document._id, document.documentName)}
                sx={{ mr: 1 }}
              >
                Preview
              </Button>
              <DeleteDocumentButton
                documentId={document._id}
                onDelete={onDelete}
              />
            </Paper>
          </Grid>
        ))
      ) : (
        <Typography sx={{ p: 2, ml: 5 }}>No documents available.</Typography>
      )}
    </Grid>
  );
};

export default DocumentList;
