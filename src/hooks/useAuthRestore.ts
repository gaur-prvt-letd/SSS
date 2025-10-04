// Quick fix - Add this to your main App component or index.tsx
// This ensures auth state is restored before any components render

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';

// Add this hook at the top of your App component
const useAuthRestore = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const restoreAuth = () => {
      const token = localStorage.getItem('access_token');
      const userDataStr = localStorage.getItem('user_data');
      
      if (token) {
        console.log('🔄 Restoring authentication state...');
        
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
        
        dispatch(login(userData));
        console.log('✅ Authentication state restored');
      }
    };
    
    restoreAuth();
  }, [dispatch]);
};

// Then in your App component:
function App() {
  useAuthRestore(); // Add this line
  
  // Your existing app code...
}

export default App;