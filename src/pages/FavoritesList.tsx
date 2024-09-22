import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import WorkspaceCard from '../components/WorkspaceComponents/WorkspaceCard';
import ApiClient from '../services/APIClient';

interface FavoritesListProps {
  limit?: number; // Add limit prop to control how many items are displayed
}

const FavoritesList: React.FC<FavoritesListProps> = ({ limit }) => {
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

  const displayedFavorites = limit ? favorites.slice(0, limit) : favorites;

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        {t('dashboard.favorites')}
      </Typography>
      {displayedFavorites.length > 0 ? (
        <Box>
          {displayedFavorites.map((favorite) => (
            <Grid item xs={12} sm={6} md={4} key={favorite._id}>
              <WorkspaceCard workspace={favorite} />
            </Grid>
          ))}
        </Box>
      ) : (
        <Typography variant='body1'>{t('dashboard.noFavorites')}</Typography>
      )}
    </Box>
  );
};

export default FavoritesList;
