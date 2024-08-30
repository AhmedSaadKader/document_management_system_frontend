import React from 'react';
import { Link, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

function Copyright(props: any) {
  const { t } = useTranslation();
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        {t('MUI')}
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;
