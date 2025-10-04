import apiClient from "./apiClient";
import { API_ENDPOINTS } from "./endpoints";

// Auth API calls
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials),

  register: (userData: {
    username: string;
    email: string;
    mobile: string;
    password: string;
  }) => apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData),

  logout: () => apiClient.post(API_ENDPOINTS.AUTH.LOGOUT),

  refreshToken: () => apiClient.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN),

  forgotPassword: (email: string) =>
    apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email }),

  resetPassword: (token: string, password: string) =>
    apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, password }),
};

// User API calls
export const userApi = {
  getProfile: () => apiClient.get(API_ENDPOINTS.USERS.PROFILE),

  changePassword: (passwordData: {
    currentPassword: string;
    newPassword: string;
  }) => apiClient.post(API_ENDPOINTS.USERS.CHANGE_PASSWORD, passwordData),

  getUserById: (id: string) => apiClient.get(API_ENDPOINTS.USERS.GET_BY_ID(id)),

  deleteUser: (id: string) => apiClient.delete(API_ENDPOINTS.USERS.DELETE(id)),
};

// Dashboard API calls
export const dashboardApi = {
  getStats: () => apiClient.get(API_ENDPOINTS.DASHBOARD.STATS),

  getRecentActivities: () =>
    apiClient.get(API_ENDPOINTS.DASHBOARD.RECENT_ACTIVITIES),
};

// Goals API calls
export const goalApi = {
  getGoals: (params?: { page?: number; limit?: number }) =>
    apiClient.get(API_ENDPOINTS.GOALS.LIST, { params }),

  createGoal: (goalData: {
    goal_title: string;
    description: string;
    goal_type: string;
    start_date: string;
    end_date: string;
    priority: string;
    category: string;
  }) =>
    apiClient.post(API_ENDPOINTS.GOALS.CREATE, goalData),

  getGoalById: (id: string) =>
    apiClient.get(API_ENDPOINTS.GOALS.GET_BY_ID(id)),

  updateGoal: (
    id: string,
    goalData: {
      goal_title?: string;
      description?: string;
      goal_type?: string;
      start_date?: string;
      end_date?: string;
      priority?: string;
      category?: string;
    }
  ) =>
    apiClient.put(API_ENDPOINTS.GOALS.UPDATE(id), goalData),

  deleteGoal: (id: string) =>
    apiClient.delete(API_ENDPOINTS.GOALS.DELETE(id)),
};
