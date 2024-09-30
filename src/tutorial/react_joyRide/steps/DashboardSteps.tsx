import React from 'react';
import { Step } from 'react-joyride';
import { TutorialPageProps } from '../CodeDisplay';
import TutorialPageSwitcher from '../TutorialPageSwitcher';

const dashboarPages: TutorialPageProps[] = [
  {
    title: 'Pagination in API Client',
    description: [],
    backend: false,
    filePath: 'src/services/APIClient.tsx',
    lineNumber: 50,
  },
  {
    title: 'Pagination in backend API',
    description: [],
    backend: true,
    filePath: 'src/controllers/workspace_controller.ts',
    lineNumber: 80,
  },
];

export const DashboardSteps: Step[] = [
  {
    target: '#public-workspaces',
    content:
      'Public workspaces are ranked by how many favorites they have gotten',
    data: { isCode: false },
  },
  {
    target: '#pagination',
    content:
      'Pagination is done to prevent server load and resources exhaustion and to enhance user experience',
    data: { isCode: false },
  },
  {
    target: '#pagination',
    content: <TutorialPageSwitcher pages={dashboarPages} />,
    data: { isCode: true },
  },
  {
    target: '#sidebar-create-workspace',
    content:
      'When you create a workspace you have the option to make it public, although by default it is private. If it is public it will appear in the public directories',
    disableBeacon: false,
    data: { isCode: false },
  },
];

export const getRouteForDashboardStep = (index: number) => {
  // Define the mapping of step indices to routes
  const routeMap: { [key: number]: string } = {
    0: '/',
    1: '/',
  };
  return routeMap[index] || '/';
};
