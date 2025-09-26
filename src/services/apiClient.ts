import axios from 'axios';
import { store } from '../app/store';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    // Adjust the following line to match the actual property name in your AuthState type
    const token = state.auth?.token ?? state.auth?.accessToken ?? '';

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Redirect to login or dispatch logout
      console.warn('Unauthorized access - redirecting to login');
      // You can dispatch logout action here
    }
    
    if (error.response?.status >= 500) {
      console.error('Server error:', error.response.data);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;