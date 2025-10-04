import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CircularProgress, Box } from '@mui/material';
import { login } from '../../features/auth/authSlice';

interface AuthInitializerProps {
  children: React.ReactNode;
}

const AuthInitializer: React.FC<AuthInitializerProps> = ({ children }) => {
  const dispatch = useDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAuth = () => {
      // Check if token exists in localStorage
      const token = localStorage.getItem('access_token');
      const userDataStr = localStorage.getItem('user_data');
      
      if (token) {
        console.log('🔐 Found token in localStorage, restoring auth state');
        
        // Try to get user data from localStorage
        let userData = {
          name: "User",
          id: "user-id",
        };
        
        if (userDataStr) {
          try {
            userData = JSON.parse(userDataStr);
          } catch (error) {
            console.error('Failed to parse user data:', error);
          }
        }
        
        // Restore auth state
        dispatch(login(userData));
        
        console.log('✅ Auth state restored from localStorage');
      } else {
        console.log('⚠️ No token found, user needs to login');
      }
      
      setIsInitialized(true);
    };

    // Initialize auth state
    initializeAuth();
  }, [dispatch]);

  // Show loading while initializing auth state
  if (!isInitialized) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
        flexDirection="column"
        gap={2}
      >
        <CircularProgress />
        <Box>Initializing...</Box>
      </Box>
    );
  }

  return <>{children}</>;
};

export default AuthInitializer;