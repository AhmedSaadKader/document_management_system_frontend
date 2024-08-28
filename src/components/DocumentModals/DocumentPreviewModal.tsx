import React, { useEffect } from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface DocumentPreviewModalProps {
  open: boolean;
  handleClose: () => void;
  documentUrl: string;
  documentName: string;
}

const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  open,
  handleClose,
  documentUrl,
  documentName,
}) => {
  useEffect(() => {
    return () => {
      // Clean up the object URL when the component is unmounted
      if (documentUrl) {
        URL.revokeObjectURL(documentUrl);
      }
    };
  }, [documentUrl]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='document-preview-title'
      aria-describedby='document-preview-description'
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography id='document-preview-title' variant='h6' component='h2'>
            {documentName}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ height: 'calc(100% - 40px)' }}>
          {documentUrl && (
            <iframe
              src={documentUrl}
              title={documentName}
              width='100%'
              height='100%'
              style={{ border: 'none' }}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default DocumentPreviewModal;
