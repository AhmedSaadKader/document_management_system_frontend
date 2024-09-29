import React from 'react';
import { Step } from 'react-joyride';

export const DashboardSteps: Step[] = [
  {
    target: '#public-workspaces',
    content:
      'Public workspaces are ranked by how many favorites they have gotten',
    data: { isCode: false, dialogOpen: true },
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
