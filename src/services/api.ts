import apiClient from "./apiClient";
import { API_ENDPOIN } from "./endpoints";

// Auth API calls
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    apiClient.post(API_ENDPOIN.AUTH.LOGIN, credentials),

  register: (userData: {
    username: string;
    email: string;
    mobile: string;
    password: string;
  }) => apiClient.post(API_ENDPOIN.AUTH.REGISTER, userData),

  logout: () => apiClient.post(API_ENDPOIN.AUTH.LOGOUT),

  refreshToken: () => apiClient.post(API_ENDPOIN.AUTH.REFRESH_TOKEN),

  forgotPassword: (email: string) =>
    apiClient.post(API_ENDPOIN.AUTH.FORGOT_PASSWORD, { email }),

  resetPassword: (token: string, password: string) =>
    apiClient.post(API_ENDPOIN.AUTH.RESET_PASSWORD, { token, password }),
};

// User API calls
export const userApi = {
  getProfile: () => apiClient.get(API_ENDPOIN.USERS.PROFILE),

  changePassword: (passwordData: {
    currentPassword: string;
    newPassword: string;
  }) => apiClient.post(API_ENDPOIN.USERS.CHANGE_PASSWORD, passwordData),

  getUserById: (id: string) => apiClient.get(API_ENDPOIN.USERS.GET_BY_ID(id)),

  deleteUser: (id: string) => apiClient.delete(API_ENDPOIN.USERS.DELETE(id)),
};

// Dashboard API calls
export const dashboardApi = {
  getStats: () => apiClient.get(API_ENDPOIN.DASHBOARD.STATS),

  getRecentActivities: () =>
    apiClient.get(API_ENDPOIN.DASHBOARD.RECENT_ACTIVITIES),
};

// Goals API calls
export const goalApi = {
  // Get all goals with pagination and filters
  getGoals: (params?: {
    page?: number;
    per_page?: number;
    limit?: number;
    search?: string;
    priority?: string;
    goal_type?: string;
    status?: boolean;
    [key: string]: unknown;
  }) => {
    console.log("🔍 API Call: GET goals with params:", params);
    return apiClient.get(API_ENDPOIN.GOALS.LIST, { params });
  },

  // Create a new goal
  createGoal: (goalData: {
    goal_title: string;
    description: string;
    goal_type: string;
    start_date: string;
    end_date: string;
    priority: string;
    category: string;
  }) => {
    console.log("📝 API Call: POST create goal with data:", goalData);
    return apiClient.post(API_ENDPOIN.GOALS.CREATE, goalData);
  },

  // Get goal by ID
  getGoalById: (id: string) => {
    console.log("🔍 API Call: GET goal by ID:", id);
    return apiClient.get(API_ENDPOIN.GOALS.GET_BY_ID(id));
  },

  // Update goal
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
      is_completed?: boolean;
    }
  ) => {
    console.log("✏️ API Call: PUT update goal:", id, goalData);
    return apiClient.put(API_ENDPOIN.GOALS.UPDATE(id), goalData);
  },

  // Delete goal
  deleteGoal: (id: string) => {
    console.log("🗑️ API Call: DELETE goal:", id);
    return apiClient.delete(API_ENDPOIN.GOALS.DELETE(id));
  },

  // Toggle goal completion status
  toggleGoalCompletion: (id: string) => {
    console.log("✅ API Call: Toggle goal completion:", id);
    return apiClient.patch(API_ENDPOIN.GOALS.UPDATE(id), {
      toggle_completion: true,
    });
  },
};
