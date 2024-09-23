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
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth_context';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

export default function SignIn() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const theme = useTheme();

  const [emailError, setEmailError] = React.useState<string | null>(null);
  const [passwordError, setPasswordError] = React.useState<string | null>(null);
  const [generalError, setGeneralError] = React.useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    // Reset errors
    setEmailError(null);
    setPasswordError(null);
    setGeneralError(null);

    // Basic validation before API call
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    if (!email) {
      setEmailError(t('authPage.emailRequired'));
      return;
    }
    if (!emailRegex.test(email)) {
      setEmailError(t('authPage.invalidEmail'));
      return;
    }

    if (!password) {
      setPasswordError(t('authPage.passwordRequired'));
      return;
    }
    if (password.length < 6) {
      // Example: minimum password length
      setPasswordError(t('authPage.passwordTooShort'));
      return;
    }

    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('The provided password is incorrect')) {
          setGeneralError(t('authPage.invalidCredentials'));
        } else {
          setGeneralError(error.message);
        }
      } else {
        setGeneralError(t('authPage.signInError'));
      }
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
          {t('authPage.signIn')}
        </Typography>

        {/* Display general error message */}
        {generalError && (
          <Alert severity='error' sx={{ width: '100%', mt: 2 }}>
            {generalError}
          </Alert>
        )}

        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label={t('authPage.email')}
            name='email'
            autoComplete='email'
            autoFocus
            error={!!emailError}
            helperText={emailError}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label={t('authPage.password')}
            type='password'
            id='password'
            autoComplete='current-password'
            error={!!passwordError}
            helperText={passwordError}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            {t('authPage.signIn')}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='/reset-password' variant='body2'>
                {t('authPage.forgotPassword')}
              </Link>
            </Grid>
            <Grid item>
              <Link href='/signup' variant='body2'>
                {t('authPage.noAccount')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
