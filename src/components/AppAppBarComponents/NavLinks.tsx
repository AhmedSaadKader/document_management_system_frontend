import React from 'react';
import { Box, Button } from '@mui/material';
import { useAuth } from '../../context/auth_context';
import { useTranslation } from 'react-i18next';

const NavLinks: React.FC = () => {
  const { t } = useTranslation();

  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <Box sx={{ display: { sm: 'none', md: 'block' } }}>
      <Button sx={{ color: '#fff' }} href='/workspaces'>
        {t('appBar.workspaces')}
      </Button>
      <Button sx={{ color: '#fff' }} href='/documents'>
        {t('appBar.documents')}
      </Button>
      <Button sx={{ color: '#fff' }} href='/recycle-bin'>
        {t('appBar.recycleBin')}
      </Button>
    </Box>
  ) : (
    <></>
  );
};

export default NavLinks;
