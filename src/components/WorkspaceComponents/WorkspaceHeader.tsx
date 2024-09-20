import React, { useEffect, useState } from 'react';
import { Typography, Box, IconButton } from '@mui/material';
import ShareWorkspaceModal from './ShareWorkspaceModal';
import ApiClient from '../../services/APIClient';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import EditWorkspaceModal from './EditWorkspaceModal';
import { Workspace } from '../../models/Workspace';
import WorkspaceDetailsModal from './WorkspaceDetailsModal';

interface WorkspaceHeaderProps {
  workspace: Workspace;
  canShare: boolean;
  owner: string;
  canEdit: boolean;
}

const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  workspace,
  canShare,
  owner,
  canEdit,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    // Check if the workspace is already favorited
    const checkIfFavorite = async () => {
      try {
        const favorite = await ApiClient.checkIfFavorite(workspace._id);

        if (favorite.isFavorited) {
          setIsFavorited(true);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    checkIfFavorite();
  }, [workspace._id]);

  const handleFavoriteClick = async () => {
    try {
      if (isFavorited) {
        await ApiClient.removeFavorite(workspace._id);
      } else {
        await ApiClient.addFavorite(workspace._id);
      }
      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography variant='h4'>{workspace.workspaceName}</Typography>
        <Typography variant='subtitle1'>{workspace.description}</Typography>
        <Typography variant='body2' color='textSecondary'>
          {owner}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}>
        {canEdit && <WorkspaceDetailsModal workspace={workspace} />}
        {canEdit && <EditWorkspaceModal workspace={workspace} />}
        {canShare && <ShareWorkspaceModal workspaceId={workspace._id} />}
        <IconButton onClick={handleFavoriteClick}>
          {isFavorited ? <Favorite color='error' /> : <FavoriteBorder />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default WorkspaceHeader;
