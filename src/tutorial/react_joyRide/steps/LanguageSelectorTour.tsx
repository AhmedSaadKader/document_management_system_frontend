import React from 'react';
import TutorialPageSwitcher from '../TutorialPageSwitcher';
import { Step } from 'react-joyride';
import { TutorialPageProps } from '../CodeDisplay';

const tutorialPages: TutorialPageProps[] = [
  { title: 'i18n.js file', backend: false, filePath: 'src/i18n.js' },
  {
    title: 'Usage in index.js',
    backend: false,
    filePath: 'src/index.tsx',
    lineNumber: 20,
  },
];

export const LanguageSelectortourSteps: Step[] = [
  {
    target: '#language-selector',
    content: 'This tool allows you to select a language for the app.',
    disableBeacon: false,
    data: { isCode: false },
  },
  {
    target: '#language-option',
    content:
      'Select language from here. You can choose from english, arabic and french',
    data: { isCode: false },
  },
  {
    target: '#language-selector',
    content: 'Technologies used: \n Packages used: ',
    data: { isCode: false },
  },
  {
    target: '#language-code',
    content: <TutorialPageSwitcher pages={tutorialPages} />,
    data: { isCode: true },
    disableBeacon: false,
  },
];

export const getRouteForLanguageStep = (index: number) => {
  // Define the mapping of step indices to routes
  const routeMap: { [key: number]: string } = {};
  return routeMap[index] || '/';
};
