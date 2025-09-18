// src/components/layout/Sidebar.tsx
import { Drawer, List, ListItem, ListItemText, ListItemButton, Toolbar } from "@mui/material";
import { SIDEBAR_WIDTH } from "./constants";

type SidebarProps = {
  open: boolean;
  variant?: "permanent" | "persistent" | "temporary";
  onClose?: () => void;
};

export const Sidebar = ({ open, variant, onClose }: SidebarProps) => {
  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: SIDEBAR_WIDTH, boxSizing: "border-box" },
      }}
    >
      <Toolbar /> {/* To align content with Navbar */}
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Transactions" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Reports" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
