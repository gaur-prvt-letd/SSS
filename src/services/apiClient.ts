import axios from 'axios';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token from localStorage
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage (saved after login)
    const token = localStorage.getItem('access_token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔐 Token added to request:', config.url);
    } else {
      console.log('⚠️ No token found in localStorage');
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.status, error.config?.url);
    
    // Handle common errors
    if (error.response?.status === 401) {
      console.warn('🚫 Unauthorized access - token expired or invalid');
      // Clear invalid token
      localStorage.removeItem('access_token');
      // Redirect to login
      window.location.href = '/login';
    }
    
    if (error.response?.status >= 500) {
      console.error('🔥 Server error:', error.response.data);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;