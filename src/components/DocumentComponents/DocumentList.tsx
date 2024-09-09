import React, { useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import DeleteDocumentButton from './DocumentButtons/DeleteDocumentButton';
import DownloadDocumentButton from './DocumentButtons/DownloadDocumentButton';
import PreviewDocumentButton from './DocumentButtons/PreviewDocumentButton';
import DetailsDocumentButton from './DocumentButtons/DetailsDocumentbutton';
import DocumentDetailsModal from './DocumentModals/DocumentDetailModal';
import DocumentPreviewModal from './DocumentModals/DocumentPreviewModal';
import { useTranslation } from 'react-i18next';

interface Document {
  wokspaceId: string;
  _id: string;
  documentName: string;
}
interface DocumentListProps {
  documents: Document[];
  onDelete: (documentId: string) => void;
  canDelete: boolean;
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onDelete,
  canDelete,
}) => {
  const [selectedDocument, setSelectedDocument] = useState<any | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');
  const [previewName, setPreviewName] = useState('');
  const { t } = useTranslation();

  const handlePreviewDocument = (documentName: string, url: string) => {
    setPreviewUrl(url);
    setPreviewName(documentName);
    setPreviewOpen(true);
  };

  const handleViewDetails = async (data: string) => {
    setSelectedDocument(data);
    setDetailsOpen(true);
  };

  const handleCloseModal = () => {
    setDetailsOpen(false);
    setSelectedDocument(null);
  };

  return (
    <Grid container spacing={3} sx={{ mr: 3 }}>
      {documents.length > 0 ? (
        documents.map((document) => (
          <Grid item xs={12} sm={6} md={4} key={document._id}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant='h6'>{document.documentName}</Typography>
              <DownloadDocumentButton
                documentId={document._id}
                workspaceId={document.wokspaceId}
              />
              <PreviewDocumentButton
                documentId={document._id}
                documentName={document.documentName}
                onPreview={handlePreviewDocument}
              />
              <DetailsDocumentButton
                documentId={document._id}
                onDetails={handleViewDetails}
              />
              {canDelete && (
                <DeleteDocumentButton
                  documentId={document._id}
                  onDelete={onDelete}
                />
              )}
            </Paper>
          </Grid>
        ))
      ) : (
        <Typography sx={{ p: 2, ml: 5 }}>
          {t('document.noDocumentsAvailable')}
        </Typography>
      )}
      {selectedDocument && (
        <DocumentDetailsModal
          open={detailsOpen}
          onClose={handleCloseModal}
          document={selectedDocument}
        />
      )}
      <DocumentPreviewModal
        open={previewOpen}
        handleClose={() => setPreviewOpen(false)}
        documentUrl={previewUrl}
        documentName={previewName}
      />
    </Grid>
  );
};

export default DocumentList;
