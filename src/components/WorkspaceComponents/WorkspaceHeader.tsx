import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  IconButton,
  useMediaQuery,
  Theme,
} from '@mui/material';
import ShareWorkspaceModal from './ShareWorkspaceModal';
import ApiClient from '../../services/APIClient';
import { Delete, Favorite, FavoriteBorder } from '@mui/icons-material';
import EditWorkspaceModal from './EditWorkspaceModal';
import { Workspace } from '../../models/Workspace';
import WorkspaceDetailsModal from './WorkspaceDetailsModal';
import { Navigate, useNavigate } from 'react-router-dom';

interface WorkspaceHeaderProps {
  workspace: Workspace;
  canShare: boolean;
  owner: string;
  canEdit: boolean;
  canDelete: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
}

const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  workspace,
  canShare,
  owner,
  canEdit,
  canDelete,
  setRefresh,
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
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

  const handleDeleteClick = async () => {
    try {
      await ApiClient.softDeleteWorkspace(workspace._id);
      navigate('/');
    } catch (error) {
      console.error('Error deleting workspace:', error);
    }
  };

  const handleFavoriteClick = async () => {
    setIsLoading(true);
    try {
      if (isFavorited) {
        await ApiClient.removeFavorite(workspace._id);
      } else {
        await ApiClient.addFavorite(workspace._id);
      }
      setIsFavorited(!isFavorited);
    } catch (error) {
      console.error('Error updating favorites:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      id='workspace-header'
      sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        gap: isMobile ? 2 : 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          overflowWrap: 'anywhere',
          flexDirection: 'column',
          gap: 1,
          width: '100%',
          maxWidth: isMobile ? '100%' : 'calc(100% - 200px)',
        }}
      >
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          sx={{
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {workspace.workspaceName}
        </Typography>
        <Typography
          id='workspace-description'
          variant='subtitle1'
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
          {workspace.description || 'No description available.'}
        </Typography>
        <Typography id='workspace-owner' variant='body2' color='textSecondary'>
          {owner}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
        {canEdit && <WorkspaceDetailsModal workspace={workspace} />}
        {canEdit && (
          <EditWorkspaceModal workspace={workspace} setRefresh={setRefresh} />
        )}
        {canShare && <ShareWorkspaceModal workspaceId={workspace._id} />}
        <IconButton
          disabled={isLoading}
          id='favorite-button'
          onClick={handleFavoriteClick}
        >
          {isFavorited ? <Favorite color='error' /> : <FavoriteBorder />}
        </IconButton>
        {!workspace.deleted && canDelete && (
          <IconButton
            // variant='outlined'
            // color='error'
            onClick={handleDeleteClick}
          >
            <Delete />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default WorkspaceHeader;
