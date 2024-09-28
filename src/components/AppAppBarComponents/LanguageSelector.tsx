import React, { useEffect, useState } from 'react';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import i18n from '../../i18n';
import { useTutorial } from '../../tutorial/driverjs/TutorialContext';
import { LanguageSelectortourSteps } from '../../tutorial/react-joydrops/LanguageSelectorTour';
import JoyRideWithConfiguration from '../../tutorial/react-joydrops/JoyRideStepsConfiguration';

const LanguageSelector: React.FC = () => {
  const [language, setLanguage] = useState(i18n.language || 'en');
  const { isTutorialMode } = useTutorial();
  const [isOpen, setIsOpen] = useState(false);
  const [shouldShowJoyride, setShouldShowJoyride] = useState(false); // New state

  useEffect(() => {
    if (isTutorialMode && isOpen) {
      setShouldShowJoyride(true);
    } else {
      setShouldShowJoyride(false);
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
    <>
      {shouldShowJoyride && (
        <>
          <JoyRideWithConfiguration
            steps={LanguageSelectortourSteps}
            shouldShowJoyride={shouldShowJoyride}
          />
          <div id='language-code'></div>
        </>
      )}
      {/* Render Joyride conditionally */}
      <Select
        id='language-selectors'
        value={language}
        onChange={handleLanguageChange}
        variant='outlined'
        size='small'
        sx={{
          color: '#fff',
          marginRight: 2,
          border: isTutorialMode ? '2px solid red' : 'none',
        }}
        onOpen={handleOpen}
        onClose={handleClose}
        onClick={() => {
          // Add onClick handler
          if (isTutorialMode) {
            setShouldShowJoyride(true);
          }
        }}
      >
        <MenuItem id='language-option' value='en'>
          En
        </MenuItem>
        <MenuItem value='ar'>Ar</MenuItem>
        <MenuItem value='fr'>Fr</MenuItem>
      </Select>
    </>
  );
};

export default LanguageSelector;
