import React from 'react';
import TutorialPageSwitcher from './TutorialPageSwitcher';
import { Step } from 'react-joyride';

const tutorialPages = [
  { title: 'i18n.js file', backend: false, filePath: 'src/i18n.js' },
  {
    title: 'Usage in index.js',
    backend: false,
    filePath: 'src/index.tsx',
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
    target: '#language-code',
    content: 'Technologies used: \n Packages used: ',
    data: { isCode: false },
  },
  {
    target: '#language-code',
    content: <TutorialPageSwitcher pages={tutorialPages} />,
    data: { isCode: true },
  },
];
