import React from 'react';
import { Tour } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useTutorial } from '../driverjs/TutorialContext';
import JoyRideWithConfiguration from './JoyRideStepsConfiguration';
import { GeneralSteps, getRouteForStep } from './steps/GeneralSteps';
import {
  getRouteForLoginStep,
  RegisterLoginSteps,
} from './steps/RegisterLoginSteps';
import {
  DashboardSteps,
  getRouteForDashboardStep,
} from './steps/DashboardSteps';
import {
  getRouteForWorkspacedStep,
  WorkspacedSteps,
} from './steps/WorkspaceSteps';
import {
  getRouteForSearchAndDocumentStep,
  SearchAndDocumentSteps,
} from './steps/SearchAndDocumentSteps';

const TutorialButton = () => {
  const { isTutorialMode, setIsTutorialMode } = useTutorial();

  const handleTourClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsTutorialMode(!isTutorialMode);
  };

  return (
    <div>
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
      {isTutorialMode && (
        <>
          <JoyRideWithConfiguration
            steps={WorkspacedSteps}
            shouldShowJoyride={isTutorialMode}
            getRouteForStep={getRouteForWorkspacedStep}
          />
        </>
      )}
      {isTutorialMode && (
        <>
          <JoyRideWithConfiguration
            steps={SearchAndDocumentSteps}
            shouldShowJoyride={isTutorialMode}
            getRouteForStep={getRouteForSearchAndDocumentStep}
          />
        </>
      )}
      {isTutorialMode && (
        <>
          <JoyRideWithConfiguration
            steps={DashboardSteps}
            shouldShowJoyride={isTutorialMode}
            getRouteForStep={getRouteForDashboardStep}
          />
        </>
      )}
      <div id='language-code'></div>
      <Button
        color='inherit'
        startIcon={<Tour />}
        onClick={handleTourClick}
        sx={{ mr: 2 }}
      ></Button>
    </div>
  );
};

export default TutorialButton;
