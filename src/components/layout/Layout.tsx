// src/components/layout/Layout.tsx
import { Box, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Sidebar } from "./Sidebar";
import { useState } from "react";

export const Layout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isSidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [isMobileOpen, setMobileOpen] = useState(false);

  const handleMenuClick = () => {
    if (isMobile) {
      setMobileOpen(!isMobileOpen);
    } else {
      setSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar onMenuClick={handleMenuClick} open={isSidebarOpen && !isMobile} />

      <Sidebar
        open={isMobile ? isMobileOpen : isSidebarOpen}
        variant={isMobile ? "temporary" : "persistent"}
        onClose={() => setMobileOpen(false)}
      />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* Push content below navbar */}
        <Outlet />
      </Box>
    </Box>
  );
};
