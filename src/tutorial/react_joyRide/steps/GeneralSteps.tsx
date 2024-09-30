import React from 'react';
import TutorialPageSwitcher from '../TutorialPageSwitcher';
import { Step } from 'react-joyride';
import MermaidContainer from '../../MermaidContainer';
import ERDiagram from '../../ERDiagram';
import WebAppTour from '../WebAppTour';

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
];

export const getRouteForStep = (index: number) => {
  // Define the mapping of step indices to routes
  const routeMap: { [key: number]: string } = {
    0: '/',
    1: '/',
    2: '/',
  };
  return routeMap[index] || '/';
};
