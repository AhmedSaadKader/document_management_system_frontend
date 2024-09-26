import React, { useEffect, useState } from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import i18n from '../../i18n';
import { useTutorial } from '../../tutorial/TutorialContext';
import { driverObj } from '../../tutorial/Tutorial';
import { languageTutorialSteps } from '../../tutorial/TutorialSteps';

const LanguageSelector: React.FC = () => {
  const [language, setLanguage] = useState(i18n.language || 'en');
  const { isTutorialMode } = useTutorial();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isTutorialMode && isOpen) {
      // Trigger tutorial step related to language selection
      driverObj(languageTutorialSteps).drive();
    }
  }, [isTutorialMode, isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
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
      id='language-selector'
      value={language}
      onChange={handleLanguageChange}
      variant='outlined'
      size='small'
      sx={{
        color: '#fff',
        marginRight: 2,
        border: isTutorialMode ? '2px solid red' : 'none',
      }}
      // open={isOpen}
      onOpen={handleOpen}
      onClose={handleClose}
    >
      <MenuItem id='language-option' value='en'>
        En
      </MenuItem>
      <MenuItem value='ar'>Ar</MenuItem>
      <MenuItem value='fr'>Fr</MenuItem>
    </Select>
  );
};

export default LanguageSelector;
