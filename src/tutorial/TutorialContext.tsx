import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  FC,
  Dispatch,
  SetStateAction,
} from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from '@mui/material';
import { CodeBlock, dracula } from 'react-code-blocks';

// Define types for context and tutorial steps
interface TutorialContextProps {
  isTutorialMode: boolean;
  setIsTutorialMode: Dispatch<SetStateAction<boolean>>;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  highlightedElement: number | null;
  setHighlightedElement: Dispatch<SetStateAction<number | null>>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export interface Step {
  title: string;
  description: string;
  techUsed: string;
  codeSnippet: string;
}

// TutorialContext
const TutorialContext = createContext<TutorialContextProps | undefined>(
  undefined
);

export const useTutorial = () => {
  const context = useContext(TutorialContext);
  if (!context)
    throw new Error('useTutorial must be used within a TutorialProvider');
  return context;
};

interface TutorialProviderProps {
  children: ReactNode;
}

export const TutorialProvider: FC<TutorialProviderProps> = ({ children }) => {
  const [isTutorialMode, setIsTutorialMode] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [highlightedElement, setHighlightedElement] = useState<number | null>(
    null
  );
  const [open, setOpen] = useState<boolean>(false);

  const value: TutorialContextProps = {
    isTutorialMode,
    setIsTutorialMode,
    currentStep,
    setCurrentStep,
    highlightedElement,
    setHighlightedElement,
    open,
    setOpen,
  };

  return (
    <TutorialContext.Provider value={value}>
      {children}
    </TutorialContext.Provider>
  );
};

interface TutorialModeProps {
  steps: Step[];
}

export const TutorialMode: FC<TutorialModeProps> = ({ steps }) => {
  const {
    isTutorialMode,
    setIsTutorialMode,
    currentStep,
    setCurrentStep,
    open,
    setOpen,
  } = useTutorial();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleNext = () =>
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const toggleTutorialMode = () => {
    setIsTutorialMode((prev) => !prev);
    if (!isTutorialMode) {
      setCurrentStep(0);
      handleOpen();
    } else {
      handleClose();
    }
  };

  return (
    <>
      <Button onClick={toggleTutorialMode}>
        {isTutorialMode ? 'Exit Tutorial' : 'Start Tutorial'}
      </Button>
      {isTutorialMode && (
        <Dialog open={open} onClose={handleClose} maxWidth='md' fullWidth>
          <DialogTitle>{steps[currentStep].title}</DialogTitle>
          <DialogContent>
            <Typography>{steps[currentStep].description}</Typography>
            <Typography variant='h6' mt={2}>
              Technologies Used:
            </Typography>
            <Typography>{steps[currentStep].techUsed}</Typography>
            <Typography variant='h6' mt={2}>
              Code Snippet:
            </Typography>
            <CodeBlock
              text={steps[currentStep].codeSnippet}
              language='javascript'
              showLineNumbers={true}
              theme={dracula}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePrev} disabled={currentStep === 0}>
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
            >
              Next
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

// Higher Order Component for Highlighting
export const withTutorialHighlight = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  stepIndex: number
) => {
  const ComponentWithHighlight: FC<P> = (props) => {
    const { isTutorialMode, currentStep } = useTutorial();

    return (
      <Box
        sx={{
          position: 'relative',
          '&::after':
            isTutorialMode && currentStep === stepIndex
              ? {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  border: '3px solid #ff4081',
                  borderRadius: '4px',
                  zIndex: 1,
                }
              : {},
        }}
      >
        <WrappedComponent {...props} />
      </Box>
    );
  };

  // Add display name for debugging in React DevTools
  ComponentWithHighlight.displayName = `withTutorialHighlight(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithHighlight;
};
