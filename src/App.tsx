import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
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
import Sidebar from './components/SidebarComponent';
import MobileDrawer from './components/AppAppBarComponents/MobileDrawer';
import SharedWorkspaces from './pages/SharedWorkspaces';
import FavoritesList from './pages/FavoritesList';
import ResetPassword from './pages/ResetPassword';

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

const SidebarRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMdUp = useMediaQuery((theme: any) => theme.breakpoints.up('md')); // 'md' breakpoint

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const excludedRoutes = ['/signin', '/signup'];

  if (excludedRoutes.includes(location.pathname)) {
    return null;
  }

  if (isAuthenticated && isMdUp) {
    return <Sidebar />;
  }

  return (
    <MobileDrawer
      mobileOpen={mobileOpen}
      handleDrawerToggle={handleDrawerToggle}
      drawerWidth={240}
    />
  );
};

const LandingRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }
  return <LandingPage />;
};

const MainContent: React.FC = () => {
  const location = useLocation();
  const isMdUp = useMediaQuery((theme: any) => theme.breakpoints.up('md'));

  const excludedRoutes = ['/signin', '/signup', '/reset-password'];

  return (
    <Box
      component='main'
      sx={{
        flexGrow: 1,
        p: 3,
        ml: excludedRoutes.includes(location.pathname)
          ? '0px'
          : isMdUp
            ? '240px'
            : '0px',
        mt: isMdUp ? '64px' : '0px',
      }}
    >
      <Routes>
        <Route path='/' element={<LandingRoute />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/reset-password' element={<ResetPassword />} />

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
          path='/shared-workspaces'
          element={
            <ProtectedRoute>
              <SharedWorkspaces />
            </ProtectedRoute>
          }
        />
        <Route
          path='/favorites'
          element={
            <ProtectedRoute>
              <FavoritesList />
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
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AppAppBar />
          <Box sx={{ display: 'flex' }}>
            <SidebarRoute />
            <MainContent />
          </Box>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
