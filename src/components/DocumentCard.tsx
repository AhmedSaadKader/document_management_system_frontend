import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from '@mui/material';
import DeleteDocumentButton from './DocumentButtons/DeleteDocumentButton';

interface DocumentCardProps {
  document: any;
  onViewDetails: (documentId: string) => void;
  onDelete: (documentId: string) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  onViewDetails,
  onDelete,
}) => (
  <Card sx={{ mb: 2, transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
    <CardContent>
      <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
        {document.documentName}
      </Typography>
      <Typography variant='body2' color='textSecondary'>
        {document.description}
      </Typography>
    </CardContent>
    <CardActions>
      <Button
        size='small'
        color='primary'
        onClick={() => onViewDetails(document._id)}
      >
        View Details
      </Button>
      <DeleteDocumentButton documentId={document._id} onDelete={onDelete} />
    </CardActions>
  </Card>
);

export default DocumentCard;
