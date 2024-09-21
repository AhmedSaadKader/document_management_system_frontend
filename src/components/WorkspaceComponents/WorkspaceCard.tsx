// components/WorkspaceCard.tsx
import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Workspace } from '../../models/Workspace';

interface WorkspaceCardProps {
  workspace: Workspace;
}

const WorkspaceCard: React.FC<WorkspaceCardProps> = ({ workspace }) => {
  const { t } = useTranslation();

  return (
    <Link
      to={`/workspace/${workspace._id}`}
      key={workspace._id}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <Card
        sx={{
          mb: 2,
          transition: '0.3s',
          '&:hover': { boxShadow: 6 },
          overflowWrap: 'anywhere',
        }}
      >
        <CardContent
          sx={{ minHeight: 80, overflowWrap: 'anywhere', height: 110 }}
        >
          <Typography
            variant='h6'
            sx={{
              fontWeight: 'bold',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'normal',
            }}
          >
            {workspace.workspaceName}
          </Typography>
          <Typography
            variant='body2'
            color='textSecondary'
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              lineHeight: '1.5em',
              maxHeight: '3em',
            }}
          >
            {workspace.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small' color='primary'>
            {t('workspace.viewDetails')}
          </Button>
        </CardActions>
      </Card>
    </Link>
  );
};

export default WorkspaceCard;
