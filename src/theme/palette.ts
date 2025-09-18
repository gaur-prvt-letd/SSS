// src/theme/palette.ts
import type { PaletteOptions } from "@mui/material/styles";

export const palette: { light: PaletteOptions; dark: PaletteOptions } = {
  light: {
    primary: {
      main: "#1976d2", // blue
    },
    secondary: {
      main: "#9c27b0", // purple
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  dark: {
    primary: {
      main: "#90caf9", // light blue
    },
    secondary: {
      main: "#ce93d8", // light purple
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
};
