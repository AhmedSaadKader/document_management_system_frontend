import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import ApiClient from '../../services/APIClient';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FavoritesList = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await ApiClient.getAllFavorites();
        setFavorites(data);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  const handleFavoriteClick = (workspaceId: string) => {
    navigate(`/workspace/${workspaceId}`);
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant='h6'>{t('dashboard.favorites')}</Typography>
      {favorites.length > 0 ? (
        <Box>
          {favorites.map((favorite) => (
            <Box key={favorite._id}>
              <Typography
                variant='subtitle1'
                onClick={() => handleFavoriteClick(favorite._id)}
                sx={{
                  cursor: 'pointer',
                }}
              >
                {favorite.workspaceName}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant='body1'>No favorites yet</Typography>
      )}
    </Paper>
  );
};

export default FavoritesList;
