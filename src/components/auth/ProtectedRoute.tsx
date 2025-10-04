import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import type { RootState } from '../../app/store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  
  // Check both Redux state and localStorage for authentication
  const user = useSelector((state: RootState) => state.auth.user);
  const token = localStorage.getItem('access_token');
  
  const isAuthenticated = user || token;

  if (!isAuthenticated) {
    console.log('🚫 Not authenticated, redirecting to login');
    // Redirect to login with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;