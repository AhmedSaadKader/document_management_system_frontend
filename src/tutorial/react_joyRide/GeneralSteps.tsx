import React from 'react';
import TutorialPageSwitcher from './TutorialPageSwitcher';
import { Step } from 'react-joyride';
import MermaidContainer from '../MermaidContainer';
import ERDiagram from '../ERDiagram';
import WebAppTour from './WebAppTour';

const signUpPages = [
  {
    title: 'API client',
    backend: false,
    filePath: 'src/services/APIClient.tsx',
  },
  {
    title: 'SignUp/OTP Frontend',
    backend: false,
    filePath: 'src/pages/SignUp.tsx',
  },
  {
    title: 'Usage in index.js',
    backend: false,
    filePath: 'src/index.tsx',
  },
];

export const GeneralSteps: Step[] = [
  {
    target: '#general-tutorial',
    content: <MermaidContainer />,
    disableBeacon: false,
    data: { isCode: true },
  },
  {
    target: '#general-tutorial',
    content: <ERDiagram />,
    disableBeacon: false,
    data: { isCode: true },
  },
  {
    target: '#general-tutorial',
    content: <WebAppTour />,
    disableBeacon: false,
    data: { isCode: true },
  },
  {
    target: '#national_id',
    content:
      'When a user wants to register, they need to provide a 14-digit unique National ID. \
      On the frontend, the input field is validated to ensure that the provided National ID is exactly 14 digits and is unique',
    disableBeacon: false,
    data: { isCode: false },
  },
  {
    target: '#national_id',
    content: <TutorialPageSwitcher pages={signUpPages} />,
    disableBeacon: false,
    data: { isCode: true },
  },
  {
    target: '#email',
    content:
      'When a user wants to register, they need to provide a 14-digit unique National ID',
    disableBeacon: false,
    data: { isCode: false },
  },

  {
    target: '#password-reset',
    content: 'password-reset button',
    disableBeacon: false,
    data: { isCode: false },
  },
  {
    target: '#password-reset-field',
    content: 'password-reset page',
    disableBeacon: false,
    data: { isCode: true },
  },
];

export const getRouteForStep = (index: number) => {
  // Define the mapping of step indices to routes
  const routeMap: { [key: number]: string } = {
    0: '/',
    1: '/',
    2: '/',
    3: '/signup',
    4: '/signup',
    5: '/reset-password',
  };
  return routeMap[index] || '/';
};
