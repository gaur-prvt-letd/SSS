// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
  },
  
  // User endpoints
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile',
    CHANGE_PASSWORD: '/users/change-password',
    LIST: '/users',
    GET_BY_ID: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
  },
  
  // Dashboard endpoints
  DASHBOARD: {
    STATS: '/dashboard/stats',
    RECENT_ACTIVITIES: '/dashboard/recent-activities',
    CHARTS: '/dashboard/charts',
  },
  
  // Transactions endpoints
  TRANSACTIONS: {
    LIST: '/transactions',
    CREATE: '/transactions',
    GET_BY_ID: (id: string) => `/transactions/${id}`,
    UPDATE: (id: string) => `/transactions/${id}`,
    DELETE: (id: string) => `/transactions/${id}`,
    SEARCH: '/transactions/search',
    EXPORT: '/transactions/export',
  },
  
  // Goals endpoints
  GOALS: {
    LIST: '/goals',
    CREATE: '/api/add/goal',
    GET_BY_ID: (id: string) => `/goals/${id}`,
    UPDATE: (id: string) => `/goals/${id}`,
    DELETE: (id: string) => `/goals/${id}`,
  },
  
  // Reports endpoints
  REPORTS: {
    FINANCIAL: '/reports/financial',
    TRANSACTIONS: '/reports/transactions',
    USERS: '/reports/users',
    EXPORT: '/reports/export',
  },
  
  // Settings endpoints
  SETTINGS: {
    APP: '/settings/app',
    USER: '/settings/user',
    NOTIFICATIONS: '/settings/notifications',
  },
};