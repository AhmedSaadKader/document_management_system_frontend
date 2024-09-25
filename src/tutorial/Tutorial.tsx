import React from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

export const tutorialSteps = [
  {
    element: 'nav',
    popover: {
      title: 'Navigation',
      description: 'This is the main navigation bar of the application.',
    },
  },
  {
    element: '#sidebar',
    popover: {
      title: 'Sidebar',
      description: 'Quick access to different sections of the app.',
    },
  },
  {
    element: '#dashboard',
    popover: {
      title: 'Dashboard',
      description: 'Overview of your workspaces and recent activities.',
    },
  },
  {
    element: '#workspaces',
    popover: {
      title: 'Workspaces',
      description: 'Manage and organize your projects here.',
    },
  },
  {
    element: '#documents',
    popover: {
      title: 'Documents',
      description: 'Access all your documents across workspaces.',
    },
  },
  // Add more steps as needed
];

export const driverObj = driver({
  showProgress: true,
  steps: tutorialSteps,
});

export const useTutorial = () => {
  const startTourFromElement = (elementId: string) => {
    const driverObj = driver({
      showProgress: true,
      steps: tutorialSteps,
    });

    // Find the index of the clicked element in the tutorial steps
    const startIndex = tutorialSteps.findIndex(
      (step) => step.element === `#${elementId}`
    );

    // if (startIndex !== -1) {
    //   driverObj.defineSteps(tutorialSteps.slice(startIndex));
    //   driverObj.start();
    // }
  };

  return { startTourFromElement };
};
