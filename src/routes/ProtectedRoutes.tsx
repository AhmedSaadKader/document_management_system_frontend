import { Dashboard } from '@mui/icons-material';
import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth_context';
import AllDocumentsPage from '../pages/AllDocuments';
import AllWorkspacesPage from '../pages/AllWorkspaces';
import ProfilePage from '../pages/Profile';
import RecycleBinPage from '../pages/RecycleBin';
import WorkspacePage from '../pages/Workspace';
import { Box, useMediaQuery } from '@mui/material';
import MobileDrawer from '../components/AppAppBarComponents/MobileDrawer';
import Sidebar from '../components/DashboardComponents/SidebarComponent';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to='/signin' />;
  }

  return <>{children}</>;
};

const ProtectedRoutes: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMdUp = useMediaQuery((theme: any) => theme.breakpoints.up('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar or Mobile Drawer */}
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

      {/* Main Content */}
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          ml: isMdUp ? '240px' : '0px', // Adjust margin based on screen size
        }}
      >
        <Routes>
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
  );
};

export default ProtectedRoutes;
