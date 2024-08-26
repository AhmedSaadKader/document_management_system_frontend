import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { useAuth } from '../context/auth_context';

const ProfilePage: React.FC = () => {
  const { user, signOut } = useAuth();

  if (!user) return <div>Loading...</div>;

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant='h5'>Profile</Typography>
          <Typography variant='body1'>Username: {user.username}</Typography>
          <Typography variant='body1'>First Name: {user.first_name}</Typography>
          <Typography variant='body1'>Last Name: {user.last_name}</Typography>
          <Typography variant='body1'>Email: {user.email}</Typography>
          <Button onClick={signOut} variant='contained' color='primary'>
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfilePage;
