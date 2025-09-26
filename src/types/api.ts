// Type definitions for API requests and responses
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  mobile: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserProfile {
  name?: string;
  email?: string;
  mobile?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}


