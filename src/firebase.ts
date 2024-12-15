// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAnalytics,
  isSupported,
  Analytics,
  logEvent,
  setAnalyticsCollectionEnabled,
} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Check if analytics is supported in the current environment
let analytics: Analytics | null = null;

isSupported()
  .then((supported) => {
    if (supported) {
      try {
        analytics = getAnalytics(app);
        if (process.env.NODE_ENV === 'development') {
          setAnalyticsCollectionEnabled(analytics, true);
        }
      } catch (error) {
        console.error('Failed to initialize Firebase Analytics:', error);
      }
    } else {
      console.warn('Firebase Analytics is not supported in this environment');
    }
  })
  .catch((error) => {
    console.error('Error checking analytics support:', error);
  });

const logPageView = (pageName: string) => {
  if (analytics) {
    logEvent(analytics, 'page_view', {
      page: pageName,
      timestamp: new Date().toISOString(),
      extra_info: 'Debugging Analytics',
      debug_mode: process.env.REACT_APP_DEBUG_MODE,
    });
  }
};

export { analytics, logPageView };
