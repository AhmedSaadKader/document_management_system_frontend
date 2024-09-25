import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  FC,
  Dispatch,
  SetStateAction,
} from 'react';

// Define types for context and tutorial steps
interface TutorialContextProps {
  isTutorialMode: boolean;
  setIsTutorialMode: Dispatch<SetStateAction<boolean>>;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
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

  const value: TutorialContextProps = {
    isTutorialMode,
    setIsTutorialMode,
    currentStep,
    setCurrentStep,
  };

  return (
    <TutorialContext.Provider value={value}>
      {children}
    </TutorialContext.Provider>
  );
};
