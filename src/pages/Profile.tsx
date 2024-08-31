import React from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { useAuth } from '../context/auth_context';
import { useTranslation } from 'react-i18next';

const ProfilePage: React.FC = () => {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();

  if (!user) return <div>Loading...</div>;

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant='h5'>{t('profile.profile')}</Typography>
          <Typography variant='body1'>
            {t('profile.firstName')}: {user.first_name}
          </Typography>
          <Typography variant='body1'>
            {t('profile.lastName')}: {user.last_name}
          </Typography>
          <Typography variant='body1'>
            {t('profile.email')}: {user.email}
          </Typography>
          <Button onClick={signOut} variant='contained' color='primary'>
            {t('profile.signOut')}
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;
