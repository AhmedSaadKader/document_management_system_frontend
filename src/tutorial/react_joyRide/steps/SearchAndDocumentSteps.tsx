import React from 'react';
import { Step } from 'react-joyride';
import { TutorialPageProps } from '../CodeDisplay';
import TutorialPageSwitcher from '../TutorialPageSwitcher';

const SearchAndDocumentPages: TutorialPageProps[] = [
  {
    title: 'Document Search',
    description: [
      'Document Search Component with setting the search states passed as props',
    ],
    backend: false,
    filePath: 'src/components/DocumentComponents/DocumentSearchFilter.tsx',
    lineNumber: 20,
  },
  {
    title: 'Debounce',
    description: ['Debounce function'],
    backend: false,
    filePath: 'src/services/Debounce.tsx',
    lineNumber: 5,
  },
  {
    title: 'Parent Search',
    description: ['Search states initialized here'],
    backend: false,
    filePath: 'src/pages/Workspace.tsx',
    lineNumber: 30,
  },
  {
    title: 'Search in backend',
    description: ['Filtering and searching for documents in backend'],
    backend: true,
    filePath: 'src/controllers/document_controller.ts',
    lineNumber: 150,
  },
  {
    title: 'S3 utils',
    description: ['s3 functions using AWS s3client'],
    backend: true,
    filePath: 'src/utils/s3_utils.ts',
    lineNumber: 5,
  },
];

export const SearchAndDocumentSteps: Step[] = [
  {
    target: '#search-div',
    content: <TutorialPageSwitcher pages={SearchAndDocumentPages} />,
    data: { isCode: true },
  },
];

export const getRouteForSearchAndDocumentStep = (index: number) => {
  // Define the mapping of step indices to routes
  const routeMap: { [key: number]: string } = {};
  return routeMap[index] || null;
};
