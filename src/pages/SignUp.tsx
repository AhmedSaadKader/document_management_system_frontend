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
import { useTheme } from '@mui/material/styles';
import ApiClient from '../services/APIClient';
import { useState } from 'react';

export type UserData = {
  national_id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export default function SignUp() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const theme = useTheme();
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const data = new FormData(event.currentTarget);
    const newUserData = {
      national_id: data.get('national_id') as string,
      first_name: data.get('first_name') as string,
      last_name: data.get('last_name') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
    };

    try {
      await ApiClient.generateOtp(newUserData);
      setUserData(newUserData);
      setOtpSent(true);
    } catch (error) {
      setErrorMessage(`${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await ApiClient.verifyOtp({ email: userData!.email, otp: otp });
      await signUp(userData as UserData);
      navigate('/dashboard');
    } catch (error) {
      setErrorMessage(`${(error as Error).message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      await ApiClient.generateOtp(userData as UserData);
      setErrorMessage(t('authPage.otpResent'));
    } catch (error) {
      setErrorMessage(
        `${t('authPage.otpResendError')} ${(error as Error).message}`
      );
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
        <Avatar sx={{ m: 1, bgcolor: theme.palette.secondary.main }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {t('authPage.signUp')}
        </Typography>
        {errorMessage && (
          <Alert severity='error' sx={{ mt: 2, width: '100%' }}>
            {errorMessage}
          </Alert>
        )}
        {!otpSent ? (
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3, width: '100%' }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='national_id'
                  label={t('authPage.nationalID')}
                  name='national_id'
                  autoComplete='national-id'
                  autoFocus
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
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} />
              ) : (
                t('authPage.signUp')
              )}
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='/signin' variant='body2'>
                  {t('authPage.alreadyAccount')}
                </Link>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box sx={{ mt: 3, width: '100%' }}>
            <TextField
              required
              fullWidth
              label={t('authPage.enterOtp')}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <Button
              onClick={handleOtpSubmit}
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} />
              ) : (
                t('authPage.verifyOtp')
              )}
            </Button>
            <Button
              onClick={handleResendOtp}
              fullWidth
              variant='outlined'
              sx={{ mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} />
              ) : (
                t('authPage.resendOtp')
              )}
            </Button>
            <Button
              onClick={() => setOtpSent(false)} // Reset OTP step and return to signup form
              fullWidth
              variant='text'
              sx={{ mb: 2 }}
              disabled={isLoading}
            >
              {t('authPage.returnToSignup')}
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}
