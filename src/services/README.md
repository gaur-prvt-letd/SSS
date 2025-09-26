# Centralized API Structure

This project uses a centralized API structure for better organization, maintainability, and consistency.

## Structure Overview

```
src/
├── services/
│   ├── apiClient.ts      # Axios instance with interceptors
│   ├── endpoints.ts      # All API endpoints
│   ├── api.ts           # API service functions
│   └── apiHelpers.ts    # Usage examples
├── types/
│   └── api.ts           # TypeScript interfaces
└── .env                 # Environment variables
```

## Configuration

### Environment Variables (.env)
```env
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_NAME=SSS App
VITE_APP_VERSION=0.0.2
```

## Usage Examples

### 1. In React Components
```tsx
import { authApi, userApi, transactionApi } from '../services/api';

const LoginComponent = () => {
  const handleLogin = async (credentials: LoginCredentials) => {
    try {
      const response = await authApi.login(credentials);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };
};
```

### 2. In Redux Actions/Thunks
```tsx
import { createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../services/api';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials) => {
    const response = await authApi.login(credentials);
    return response.data;
  }
);
```

### 3. With React Query
```tsx
import { useQuery } from '@tanstack/react-query';
import { userApi } from '../services/api';

const useUserProfile = () => {
  return useQuery({
    queryKey: ['userProfile'],
    queryFn: () => userApi.getProfile(),
  });
};
```

## Features

### ✅ Centralized Configuration
- Single place for all API endpoints
- Environment-based base URL
- Consistent request/response handling

### ✅ Authentication
- Automatic token injection
- Token refresh handling
- Logout on 401 responses

### ✅ Error Handling
- Global error interceptors
- Consistent error responses
- Logging and debugging

### ✅ TypeScript Support
- Strongly typed requests/responses
- Better IDE support
- Runtime error prevention

### ✅ Organized by Feature
- Auth, Users, Transactions, etc.
- Easy to find and maintain
- Scalable structure

## Benefits

1. **Consistency**: All API calls follow the same pattern
2. **Maintainability**: Easy to update endpoints in one place
3. **Reusability**: API functions can be used across components
4. **Error Handling**: Centralized error management
5. **Type Safety**: TypeScript interfaces prevent runtime errors
6. **Testing**: Easy to mock API calls for testing

## Adding New APIs

1. Add endpoint to `endpoints.ts`
2. Create API function in `api.ts`
3. Add TypeScript types in `types/api.ts`
4. Use in components as needed

Example:
```tsx
// 1. Add endpoint
PRODUCTS: {
  LIST: '/products',
  CREATE: '/products',
}

// 2. Add API function
export const productApi = {
  getProducts: (params?: QueryParams) =>
    apiClient.get(API_ENDPOINTS.PRODUCTS.LIST, { params }),
};

// 3. Use in component
const products = await productApi.getProducts({ page: 1 });
```