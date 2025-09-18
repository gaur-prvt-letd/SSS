// src/app/AppThemeProvider.tsx
import React from "react";
import { useSelector } from "react-redux";
import type{ RootState } from "./store";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { mode, primaryColor } = useSelector((state: RootState) => state.theme);

  // useMemo ensures new theme object whenever mode or primaryColor changes
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: primaryColor },
        },
      }),
    [mode, primaryColor]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
