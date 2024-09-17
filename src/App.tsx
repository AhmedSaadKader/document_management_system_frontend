import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import LandingPage from './pages/LandingPage';
import AppAppBar from './components/AppAppBarComponents/AppAppBar';
import { Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/auth_context';
import { ThemeProvider } from './context/theme_context';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/Profile';
import { CircularProgress, Box, useMediaQuery } from '@mui/material';
import WorkspacePage from './pages/Workspace';
import AllWorkspacesPage from './pages/AllWorkspaces';
import AllDocumentsPage from './pages/AllDocuments';
import RecycleBinPage from './pages/RecycleBin';
import Sidebar from './components/DashboardComponents/SidebarComponent';
import MobileDrawer from './components/AppAppBarComponents/MobileDrawer';

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMdUp = useMediaQuery((theme: any) => theme.breakpoints.up('md')); // 'md' breakpoint

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AppAppBar /> {/* Pass drawer toggle for AppBar */}
          <Box sx={{ display: 'flex' }}>
            {isMdUp ? (
              <Box sx={{ mt: '64px' }}>
                <Sidebar />
              </Box>
            ) : (
              <MobileDrawer
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
                drawerWidth={240}
              />
            )}
            {/* Adjust the content area to accommodate Sidebar */}
            <Box
              component='main'
              sx={{
                flexGrow: 1,
                p: 3,
                ml: isMdUp ? '240px' : '0px',
              }}
            >
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
                  path='/workspaces'
                  element={
                    <ProtectedRoute>
                      <AllWorkspacesPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/documents'
                  element={
                    <ProtectedRoute>
                      <AllDocumentsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/recycle-bin'
                  element={
                    <ProtectedRoute>
                      <RecycleBinPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path='/workspace/:workspaceId'
                  element={
                    <ProtectedRoute>
                      <WorkspacePage />
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
            </Box>
          </Box>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
