import React from 'react';
import { Tour } from '@mui/icons-material';
import { Fab, Menu, MenuItem } from '@mui/material';
import { t } from 'i18next';
import { useState } from 'react';
import { useTutorial } from '../driverjs/TutorialContext';

const TutorialFab = () => {
  const { isTutorialMode, setIsTutorialMode } = useTutorial();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleTourClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget); // Open the menu from the FAB
  };

  const handleMenuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleTutorialToggle = () => {
    setIsTutorialMode(!isTutorialMode);
    handleMenuClose(); // Close the menu after selection
  };

  return (
    <>
      <Fab
        color='primary'
        aria-label='take a tour'
        onClick={handleTourClick}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }}
      >
        <Tour />
      </Fab>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleTutorialToggle}>
          {isTutorialMode ? t('appBar.endTour') : t('appBar.takeTour')}
        </MenuItem>
        <MenuItem
          onClick={() => {
            /* Additional action */
          }}
        >
          {t('appBar.anotherAction')}
        </MenuItem>
        {/* Add more menu items as needed */}
      </Menu>
    </>
  );
};

export default TutorialFab;
