import { authApi, userApi } from "../services/api";
import type { LoginCredentials } from "../types/api";
import type { RegisterData } from "../types/api";

// Example usage in a React component or Redux thunk

// Login example
export const loginUser = async (credentials: LoginCredentials) => {
  try {
    const response = await authApi.login(credentials);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

// Register example
export const registerUser = async (userData: RegisterData) => {
  try {
    const response = await authApi.register(userData);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

// Get user profile example
export const getUserProfile = async () => {
  try {
    const response = await userApi.getProfile();
    return response.data;
  } catch (error) {
    console.error("Failed to get user profile:", error);
    throw error;
  }
};
