import React, { useEffect, useState } from 'react';
import Joyride, {
  ACTIONS,
  CallBackProps,
  EVENTS,
  STATUS,
  Step,
} from 'react-joyride';

interface JoyRideWithConfigurationProps {
  steps: Step[];
  shouldShowJoyride: boolean;
}

const JoyRideWithConfiguration: React.FC<JoyRideWithConfigurationProps> = ({
  steps,
  shouldShowJoyride,
}) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [width, setWidth] = useState('auto');

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, index, status, type } = data;

    if (
      ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)
    ) {
      // Update state to advance the tour
      setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1));
    } else if (
      ([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)
    ) {
      // Need to set our running state to false, so we can restart if we click start again.
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
      run={shouldShowJoyride}
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
          maxWidth: '80%',
          maxHeight: '70%',
        },
      }}
    />
  );
};

export default JoyRideWithConfiguration;
