import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppAppBar from '../components/AppAppBarComponents/AppAppBar';
import ProtectedRoutes from './ProtectedRoutes';
import PublicRoutes from './PublicRoutes';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <AppAppBar />
      <PublicRoutes />
      <ProtectedRoutes />
    </Router>
  );
};

export default AppRoutes;
