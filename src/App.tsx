import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import LandingPage from './pages/LandingPage';
import AppAppBar from './components/AppAppBar';
import { Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/auth_context';
import { ThemeProvider } from './context/theme_context';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/Profile';
import { CircularProgress } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!isAuthenticated) {
    return <Navigate to='/signin' />;
  }

  return <>{children}</>;
};

const LandingRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  return <LandingPage />;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AppAppBar />
          <Routes>
            <Route path='/' element={<LandingRoute />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route
              path='/dashboard'
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
