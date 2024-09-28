import React, { ReactNode } from 'react';
import { Button, Box, Typography } from '@mui/material';

interface TutorialStepContentProps {
  title: string;
  mainContent: ReactNode; // This can be any component passed as a prop
  goToStep: (stepIndex: number) => void; // Function to navigate to certain steps
}

const TutorialStepContent: React.FC<TutorialStepContentProps> = ({
  title,
  mainContent,
  goToStep,
}) => {
  return (
    <Box p={2} boxShadow={3} borderRadius={3}>
      {/* Header Section with Navigation Buttons */}
      <Box display='flex' justifyContent='space-between' mb={2}>
        <Typography variant='h6'>{title}</Typography>
        <Box>
          <Button
            variant='outlined'
            size='small'
            onClick={() => goToStep(0)} // Go to step 1
          >
            Step 1
          </Button>
          <Button
            variant='outlined'
            size='small'
            onClick={() => goToStep(1)} // Go to step 2
            style={{ marginLeft: '10px' }}
          >
            Step 2
          </Button>
          <Button
            variant='outlined'
            size='small'
            onClick={() => goToStep(2)} // Go to step 3
            style={{ marginLeft: '10px' }}
          >
            Step 3
          </Button>
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box mt={2}>{mainContent}</Box>
    </Box>
  );
};

export default TutorialStepContent;
