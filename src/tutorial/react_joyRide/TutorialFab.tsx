import React from 'react';
import { Tour } from '@mui/icons-material';
import { Fab } from '@mui/material';
import { useTutorial } from '../driverjs/TutorialContext';
import JoyRideWithConfiguration from './JoyRideStepsConfiguration';
import { GeneralSteps, getRouteForStep } from './steps/GeneralSteps';
import {
  getRouteForLoginStep,
  RegisterLoginSteps,
} from './steps/RegisterLoginSteps';

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
      <div id='language-code'></div>
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
