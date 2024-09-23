import React, { useState } from 'react';
import { Box, TextField, Button, Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/auth_context';
import { useNavigate } from 'react-router-dom';

const OTPInput = ({ email }: { email: string }) => {
  const { t } = useTranslation();
  const { resetPasswordWithNewPassword } = useAuth();

  const [otp, setOtp] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [otpError, setOtpError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOtpError(null);
    setPasswordError(null);
    setGeneralError(null);
    setSuccessMessage(null);

    if (!otp) {
      setOtpError(t('authPage.otpRequired'));
      return;
    }

    if (!newPassword) {
      setPasswordError(t('authPage.passwordRequired'));
      return;
    }

    try {
      await resetPasswordWithNewPassword(email, otp, newPassword);
      setSuccessMessage(t('authPage.passwordResetSuccess'));
      navigate('/signin');
    } catch (error) {
      console.error(error);
      setGeneralError(t('authPage.resetPasswordError'));
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
      {successMessage && <Alert severity='success'>{successMessage}</Alert>}
      {generalError && <Alert severity='error'>{generalError}</Alert>}

      <TextField
        margin='normal'
        required
        fullWidth
        id='otp'
        label={t('authPage.otp')}
        name='otp'
        autoFocus
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        error={!!otpError}
        helperText={otpError}
      />
      <TextField
        margin='normal'
        required
        fullWidth
        id='new-password'
        label={t('authPage.newPassword')}
        name='new-password'
        type='password'
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        error={!!passwordError}
        helperText={passwordError}
      />
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        {t('authPage.resetPassword')}
      </Button>
    </Box>
  );
};

export default OTPInput;
