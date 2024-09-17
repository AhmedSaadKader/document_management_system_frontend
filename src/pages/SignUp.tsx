import * as React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../context/auth_context';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Copyright from '../components/Copyright';
import { useTheme } from '@mui/material/styles';

export default function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const theme = useTheme();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      national_id: data.get('national_id') as string,
      first_name: data.get('first_name') as string,
      last_name: data.get('last_name') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
    };
    try {
      await signUp(userData);
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(
        `${t('authPage.signUpError')} ${(error as Error).message}`
      );
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
        <Avatar sx={{ m: 1, bgcolor: theme.palette.secondary.main }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {t('authPage.signUp')}
        </Typography>
        {errorMessage && (
          <Alert severity='error' sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='national_id'
                label={t('authPage.nationalID')}
                name='national_id'
                autoComplete='national-id'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='given-name'
                name='first_name'
                required
                fullWidth
                id='first_name'
                label={t('authPage.firstName')}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='last_name'
                label={t('authPage.lastName')}
                name='last_name'
                autoComplete='family-name'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='email'
                label={t('authPage.email')}
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name='password'
                label={t('authPage.password')}
                type='password'
                id='password'
                autoComplete='new-password'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            {t('authPage.signUp')}
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
