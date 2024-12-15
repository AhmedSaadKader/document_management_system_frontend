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
  apiKey: 'AIzaSyB82DYnOdOROdb8IwrPclid2xxT2b7IxI0',
  authDomain: 'document-management-syst-76f5a.firebaseapp.com',
  projectId: 'document-management-syst-76f5a',
  storageBucket: 'document-management-syst-76f5a.firebasestorage.app',
  messagingSenderId: '500078045870',
  appId: '1:500078045870:web:009b3e7e3081ab62911b3f',
  measurementId: 'G-3LFDER5M80',
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
    logEvent(analytics, 'test_debug_event', {
      page: pageName,
      timestamp: new Date().toISOString(),
      extra_info: 'Debugging Analytics',
    });

    // Log directly with gtag for additional verification
    window.gtag('event', 'page_view', {
      page_path: pageName,
      debug_mode: true,
    });
  }
};

export { analytics, logPageView };
