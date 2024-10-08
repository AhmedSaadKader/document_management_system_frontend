import React, { useState } from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../context/auth_context';
import OTPInput from '../components/OTPInput';

export default function ResetPassword() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailError(null);
    setGeneralError(null);
    setSuccessMessage(null);

    if (!email) {
      setEmailError(t('authPage.emailRequired'));
      return;
    }

    try {
      await resetPassword(email as string);
      setSuccessMessage(t('authPage.resetEmailSent'));
      setOtpSent(true); // Show the OTP input after sending email
    } catch (error) {
      console.error(error);
      setGeneralError(t('authPage.resetPasswordError'));
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        id='password-reset-field'
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: theme.palette.secondary.main }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {t('authPage.resetPassword')}
        </Typography>

        {/* Display success or error messages */}
        {successMessage && (
          <Alert severity='success' sx={{ width: '100%', mt: 2 }}>
            {successMessage}
          </Alert>
        )}
        {generalError && (
          <Alert severity='error' sx={{ width: '100%', mt: 2 }}>
            {generalError}
          </Alert>
        )}

        {!otpSent ? (
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label={t('authPage.email')}
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!emailError}
              helperText={emailError}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              {t('authPage.sendResetLink')}
            </Button>
          </Box>
        ) : (
          <OTPInput email={email} />
        )}
      </Box>
    </Container>
  );
}
