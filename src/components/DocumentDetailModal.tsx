import React from 'react';
import { Modal, Box, Typography, Button, Divider } from '@mui/material';

interface DocumentDetailsModalProps {
  open: boolean;
  onClose: () => void;
  document: any;
}

const DocumentDetailsModal: React.FC<DocumentDetailsModalProps> = ({
  open,
  onClose,
  document,
}) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby='modal-title'>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id='modal-title' variant='h6' component='h2'>
          {document.documentName}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant='body2' color='textSecondary'>
          Description: {document.description}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          User: {document.user}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          File Size: {document.fileSize} bytes
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          Created At: {new Date(document.createdAt).toLocaleString()}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          Updated At: {new Date(document.updatedAt).toLocaleString()}
        </Typography>
        <Button
          onClick={onClose}
          variant='contained'
          color='primary'
          sx={{ mt: 2 }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default DocumentDetailsModal;
