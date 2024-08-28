import React from 'react';
import { Typography, Box } from '@mui/material';

interface WorkspaceHeaderProps {
  workspaceName: string;
  description: string;
}

const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  workspaceName,
  description,
}) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant='h4' gutterBottom>
        {workspaceName}
      </Typography>
      <Typography variant='body1' gutterBottom>
        {description}
      </Typography>
    </Box>
  );
};

export default WorkspaceHeader;
