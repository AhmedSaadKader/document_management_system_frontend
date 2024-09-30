import React from 'react';
import TutorialPageSwitcher from '../TutorialPageSwitcher';
import { Step } from 'react-joyride';
import { TutorialPageProps } from '../CodeDisplay';

const signUpPages: TutorialPageProps[] = [
  {
    title: 'API client',
    description: [
      'API client with static methods to use without instantiating a new class',
    ],
    backend: false,
    filePath: 'src/services/APIClient.tsx',
  },
  {
    title: 'Auth Context',
    description: [
      'Usage of the APIClient static methods in AuthContext to signup and login',
    ],
    backend: false,
    filePath: 'src/context/auth_context.tsx',
    lineNumber: 100,
  },
  {
    title: 'SignUp/OTP Frontend',
    description: [
      'Usage of the APIClient static methods in signup page to generate OTP',
    ],
    backend: false,
    filePath: 'src/pages/SignUp.tsx',
    lineNumber: 142,
  },
  {
    title: 'UserOTP Model Backend',
    description: [
      `
        User OTP table to hold OTPs used for both registering and password-reset.`,
      'It has a 10 minute expiration period.',
      'Nodemailer is used for sending the emails of the OTPs (line 40).',
      "Emails are sent from my personal gmail using Google's SMTP.",
      `Crypto is used for generating the OTPs (line 71).
      `,
    ],
    backend: true,
    filePath: 'src/models/user_otp.ts',
    lineNumber: 20,
  },
];

export const RegisterLoginSteps: Step[] = [
  {
    target: '.login-tutorial',
    content: 'Langing Page that allows navigation to login and register',
    disableBeacon: false,
    data: { isCode: false },
  },
  {
    target: '#national_id',
    content:
      'When a user wants to register, they need to provide a 14-digit National ID which should be unique for every user.',
    disableBeacon: false,
    data: { isCode: false },
  },

  {
    target: '#email',
    content: 'Email OTP authentication is implemented',
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

export const getRouteForLoginStep = (index: number) => {
  // Define the mapping of step indices to routes
  const routeMap: { [key: number]: string } = {
    0: '/',
    1: '/signup',
    2: '/signup',
    3: '/signup',
    4: '/signin',
    5: '/reset-password',
  };
  return routeMap[index] || '/';
};
