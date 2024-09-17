import React, { useEffect, useState } from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import i18n from '../../i18n';

const LanguageSelector: React.FC = () => {
  const [language, setLanguage] = useState(i18n.language || 'en');

  useEffect(() => {
    // Update document body direction based on the selected language
    const direction = language === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = direction;
  }, [language]);

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);

    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('language', selectedLanguage);
  };

  return (
    <Select
      value={language}
      onChange={handleLanguageChange}
      variant='outlined'
      size='small'
      sx={{ color: '#fff', marginRight: 2 }}
    >
      <MenuItem value='en'>En</MenuItem>
      <MenuItem value='ar'>Ar</MenuItem>
      <MenuItem value='fr'>Fr</MenuItem>
    </Select>
  );
};

export default LanguageSelector;
