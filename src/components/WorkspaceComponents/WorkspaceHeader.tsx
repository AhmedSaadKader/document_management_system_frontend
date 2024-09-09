import React, { useEffect, useState } from 'react';
import { Typography, Box, IconButton } from '@mui/material';
import ShareWorkspaceModal from './ShareWorkspaceModal';
import ApiClient from '../../services/APIClient';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

interface WorkspaceHeaderProps {
  workspaceName: string;
  workspaceId: string;
  description: string;
  canShare: boolean;
}

const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  workspaceName,
  workspaceId,
  description,
  canShare,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    // Check if the workspace is already favorited
    const checkIfFavorite = async () => {
      try {
        const favorite = await ApiClient.checkIfFavorite(workspaceId);
        console.log(favorite);

        if (favorite.isFavorited) {
          setIsFavorited(true);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    checkIfFavorite();
  }, [workspaceId]);

  const handleFavoriteClick = async () => {
    try {
      if (isFavorited) {
        await ApiClient.removeFavorite(workspaceId);
      } else {
        await ApiClient.addFavorite(workspaceId);
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
      <Typography variant='h4'>{workspaceName}</Typography>
      <Typography variant='subtitle1'>{description}</Typography>
      <Box sx={{ display: 'flex' }}>
        {canShare && <ShareWorkspaceModal workspaceId={workspaceId} />}
        <IconButton onClick={handleFavoriteClick}>
          {isFavorited ? <Favorite color='error' /> : <FavoriteBorder />}
        </IconButton>
      </Box>
    </Box>
  );
};

export default WorkspaceHeader;
