import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';

export const driverObj = (tutorialSteps: object[]) =>
  driver({
    showProgress: true,
    steps: tutorialSteps,
  });
