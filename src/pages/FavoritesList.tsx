import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import WorkspaceCard from '../components/WorkspaceComponents/WorkspaceCard';
import ApiClient from '../services/APIClient';

interface FavoritesListProps {
  limit?: number;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ limit }) => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { t } = useTranslation();

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true); // Set loading to true when starting the fetch
      try {
        const data = await ApiClient.getAllFavorites();
        setFavorites(data);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      } finally {
        setLoading(false);
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
      {loading ? (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          height='200px'
        >
          <CircularProgress />{' '}
          {/* You can replace this with a loading message if desired */}
        </Box>
      ) : displayedFavorites.length > 0 ? (
        <Grid container spacing={2}>
          {displayedFavorites.map((favorite) => (
            <Grid item xs={12} sm={6} md={4} key={favorite._id}>
              <WorkspaceCard workspace={favorite} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant='body1'>{t('dashboard.noFavorites')}</Typography>
      )}
    </Box>
  );
};

export default FavoritesList;
