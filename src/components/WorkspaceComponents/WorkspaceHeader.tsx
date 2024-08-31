import React from 'react';
import { Typography, Box } from '@mui/material';
import ShareWorkspaceModal from './ShareWorkspaceModal';

interface WorkspaceHeaderProps {
  workspaceName: string;
  workspaceId: string;
  description: string;
}

const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  workspaceName,
  workspaceId,
  description,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant='h4'>{workspaceName}</Typography>
      <Typography variant='subtitle1'>{description}</Typography>
      <ShareWorkspaceModal workspaceId={workspaceId} />
    </Box>
  );
};

export default WorkspaceHeader;
