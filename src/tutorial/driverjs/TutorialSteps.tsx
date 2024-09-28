import React from 'react';
import TutorialPage from './CodeDisplay';

export const generalTutorialSteps = [
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

export const appBarTutorialSteps = [
  {
    element: 'nav',
    popover: {
      title: 'Navigation',
      description: 'This is the main navigation bar of the application.',
    },
  },
  {
    element: '#custom-code-container',
    popover: {
      title: 'xxx',
      // description: <TutorialPage />,
    },
    // content: <TutorialPage />,
  },
];

export const languageTutorialSteps = [
  {
    element: '#language-selector',
    popover: {
      title: 'Language Selector',
      description: 'Here you can change the language of the application.',
    },
  },
  {
    element: '#language-option',
    popover: {
      title: 'Select Language',
      description:
        '<pre><code class="language-javascript"> console.log(\'Selected language:\', i18n.language); </code></pre>',
    },
  },
  // Add more steps as needed
];

export const darkModeTutorialSteps = [
  {
    element: '#dark-mode-toggle',
    popover: {
      title: 'Dark Mode Toggle',
      description: 'Switch between light and dark modes here.',
    },
  },
  {
    element: '#dark-mode-setting',
    popover: {
      title: 'Dark Mode Setting',
      description: "Adjust the app's theme to your preference.",
    },
  },
  // Add more steps as needed
];
