// src/components/ThemeToggleButton.tsx
import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { toggleTheme } from "../app/themeSlice";

export const ThemeToggleButton = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  return (
    <IconButton onClick={() => dispatch(toggleTheme())} color="inherit">
      {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};
