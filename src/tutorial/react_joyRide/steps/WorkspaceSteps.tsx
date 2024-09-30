import React from 'react';
import { Step } from 'react-joyride';
import { TutorialPageProps } from '../CodeDisplay';
import TutorialPageSwitcher from '../TutorialPageSwitcher';

const WorkspacePages: TutorialPageProps[] = [
  {
    title: 'Workspace Header',
    description: ['Ellipsis'],
    backend: false,
    filePath: 'src/components/WorkspaceComponents/WorkspaceHeader.tsx',
    lineNumber: 100,
  },
  {
    title: 'Workspace Header',
    description: ['Differentiating between owners/editors and viewers'],
    backend: false,
    filePath: 'src/components/WorkspaceComponents/WorkspaceHeader.tsx',
    lineNumber: 126,
  },
  {
    title: 'Favorites Model',
    description: ['It is a separate collection in mongodb'],
    backend: true,
    filePath: 'src/models/favorite.ts',
    lineNumber: 25,
  },
  {
    title: 'Favorites Controller',
    description: [],
    backend: true,
    filePath: 'src/controllers/favorite_controller.ts',
    lineNumber: 35,
  },
];

export const WorkspacedSteps: Step[] = [
  {
    target: '#workspace-header',
    content:
      'Workspace header differs between owners/editors and viewers.\
    For owners/editors it allows sharing, view details and editing the workspace.',
    data: { isCode: false },
  },
  {
    target: '#workspace-description',
    content:
      'Workspace title supports ellipsis in case the title and description is too long for better user experience',
    data: { isCode: false },
  },
  {
    target: '#workspace-owner',
    content: 'Workspace owner',
    data: { isCode: false },
  },
  {
    target: '#favorite-button',
    content: 'Add/remove to/from favorites',
    data: { isCode: true },
  },
  {
    target: '#favorite-button',
    content: <TutorialPageSwitcher pages={WorkspacePages} />,
    data: { isCode: true },
  },
];

export const getRouteForWorkspacedStep = (index: number) => {
  // Define the mapping of step indices to routes
  const routeMap: { [key: number]: string } = {};
  return routeMap[index] || null;
};
