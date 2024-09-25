import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { TutorialProvider } from './tutorial/TutorialContext';

// Determine if the current language is RTL
const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';

// Create a theme with the correct direction
const theme = createTheme({
  direction: direction,
});

// Update the body and root elements to use the correct direction
document.body.dir = direction;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <TutorialProvider>
    <I18nextProvider i18n={i18n}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </I18nextProvider>
  </TutorialProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
