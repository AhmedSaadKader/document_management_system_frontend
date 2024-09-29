import React from 'react';
import { Tour } from '@mui/icons-material';
import { Fab } from '@mui/material';
import { useTutorial } from '../driverjs/TutorialContext';
import JoyRideWithConfiguration from './JoyRideStepsConfiguration';
import { GeneralSteps, getRouteForStep } from './GeneralSteps';
import { getRouteForLoginStep, RegisterLoginSteps } from './RegisterLoginSteps';

const TutorialFab = () => {
  const { isTutorialMode, setIsTutorialMode } = useTutorial();

  const handleTourClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsTutorialMode(!isTutorialMode);
  };

  return (
    <div id='general-tutorial'>
      {isTutorialMode && (
        <>
          <JoyRideWithConfiguration
            steps={GeneralSteps}
            shouldShowJoyride={isTutorialMode}
            getRouteForStep={getRouteForStep}
          />
        </>
      )}
      {isTutorialMode && (
        <>
          <JoyRideWithConfiguration
            steps={RegisterLoginSteps}
            shouldShowJoyride={isTutorialMode}
            getRouteForStep={getRouteForLoginStep}
          />
        </>
      )}
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
    </div>
  );
};

export default TutorialFab;
