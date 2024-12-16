import * as React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
  CircularProgress,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../context/auth_context';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({
    first_name: null,
    last_name: null,
    email: null,
    password: null,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setErrors({
      first_name: null,
      last_name: null,
      email: null,
      password: null,
    });

    const data = new FormData(event.currentTarget);
    const newUserData = {
      first_name: data.get('first_name') as string,
      last_name: data.get('last_name') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
    };

    // Frontend validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newUserData.first_name) {
      setErrors((prev) => ({
        ...prev,
        first_name: t('authPage.firstNameRequired'),
      }));
      setIsLoading(false);
      return;
    }
    if (!newUserData.last_name) {
      setErrors((prev) => ({
        ...prev,
        last_name: t('authPage.lastNameRequired'),
      }));
      setIsLoading(false);
      return;
    }
    if (!newUserData.email || !emailRegex.test(newUserData.email)) {
      setErrors((prev) => ({ ...prev, email: t('authPage.invalidEmail') }));
      setIsLoading(false);
      return;
    }
    if (!newUserData.password || newUserData.password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: t('authPage.passwordTooShort'),
      }));
      setIsLoading(false);
      return;
    }

    try {
      await signUp(newUserData);
      navigate('/signin'); // Redirect after signup
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {t('authPage.signUp')}
        </Typography>
        {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name='first_name'
                fullWidth
                id='first_name'
                label={t('authPage.firstName')}
                autoFocus
                error={!!errors.first_name}
                helperText={errors.first_name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name='last_name'
                fullWidth
                id='last_name'
                label={t('authPage.lastName')}
                error={!!errors.last_name}
                helperText={errors.last_name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='email'
                fullWidth
                id='email'
                label={t('authPage.email')}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name='password'
                type='password'
                fullWidth
                id='password'
                label={t('authPage.password')}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : t('authPage.signUp')}
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link href='/signin' variant='body2'>
                {t('authPage.alreadyAccount')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
