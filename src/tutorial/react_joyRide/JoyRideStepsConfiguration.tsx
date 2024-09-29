import { useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Joyride, {
  ACTIONS,
  CallBackProps,
  EVENTS,
  STATUS,
  Step,
} from 'react-joyride';
import { useLocation, useNavigate } from 'react-router-dom';

interface JoyRideWithConfigurationProps {
  steps: Step[];
  shouldShowJoyride: boolean;
  getRouteForStep?: any;
}

const getRouteForSteps = (index: number) => {
  // Define the mapping of step indices to routes
  const routeMap: { [key: number]: string } = {};
  return routeMap[index] || '/';
};

const JoyRideWithConfiguration: React.FC<JoyRideWithConfigurationProps> = ({
  steps,
  shouldShowJoyride,
  getRouteForStep = getRouteForSteps,
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [width, setWidth] = useState('auto');
  const [run, setRun] = useState(shouldShowJoyride);
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the current route matches the expected route for the current step
    const currentStep = steps[stepIndex];
    if (currentStep && currentStep.target) {
      const targetElement = document.querySelector(
        currentStep.target as string
      );
      if (!targetElement) {
        // If the target element is not found, navigate to the correct route
        const route = getRouteForStep(stepIndex);
        if (route && location.pathname !== route) {
          navigate(route);
        }
      }
    }
  }, [stepIndex, location]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, status, type } = data;

    if (
      ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)
    ) {
      setStepIndex((prevIndex) => {
        const nextIndex = action === 'prev' ? prevIndex - 1 : prevIndex + 1;
        const nextRoute = getRouteForStep(nextIndex);
        if (
          location.pathname !== nextRoute &&
          location.pathname !== '/dashboard'
        ) {
          navigate(nextRoute);
        }
        return nextIndex;
      });
    } else if (
      ([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)
    ) {
      setRun(false);
      setStepIndex(0);
    }
  };

  const toolTipWidth = () => {
    // Ensure stepIndex is within bounds before accessing
    if (stepIndex >= 0 && stepIndex < steps.length) {
      const isCode = steps[stepIndex]?.data?.isCode; // Optional chaining to avoid errors
      return isCode ? '1200px' : 'auto';
    }
    return 'auto'; // Default width if stepIndex is out of bounds
  };

  useEffect(() => {
    setWidth(toolTipWidth);
  }, [stepIndex]);

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous={true}
      scrollToFirstStep={true}
      stepIndex={stepIndex}
      showProgress={true}
      showSkipButton={true}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          zIndex: 10000,
          width: width,
        },
        tooltipContainer: {
          lineHeight: 1.4,
          textAlign: 'left',
        },
        tooltip: {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          maxWidth: '80%',
          maxHeight: '70%',
        },
        buttonNext: {
          backgroundColor: theme.palette.primary.contrastText,
          color: theme.palette.text.primary,
        },
        buttonBack: {
          // backgroundColor: theme.palette.secondary.main,
          color: theme.palette.text.primary,
        },
        buttonClose: {
          color: theme.palette.text.primary,
        },
        buttonSkip: {
          color: theme.palette.text.primary,
        },
      }}
    />
  );
};

export default JoyRideWithConfiguration;
