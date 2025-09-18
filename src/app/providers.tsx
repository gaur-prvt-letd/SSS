// src/app/providers.tsx
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import { AppThemeProvider } from "./AppThemeProvider";

const queryClient = new QueryClient();

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppThemeProvider>
          <ErrorBoundary
            fallbackRender={({ error }) => (
              <div>
                <h2>Something went wrong.</h2>
                <pre>{error.message}</pre>
              </div>
            )}
          >
            {children}
            <Toaster position="top-right" />
          </ErrorBoundary>
        </AppThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};
