import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Toolbar,
  Box,
  Typography,
  Divider,
  Collapse,
} from "@mui/material";
import { SIDEBAR_WIDTH } from "./constants";
import Logo from "../../assets/logo/LogoNEW.png";
import { Link } from "react-router-dom";
import { DASHBOARD, ADD_GOAL, REPORTS, TRANSACTIONS } from "../../codes/routes";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import TimelineIcon from '@mui/icons-material/Timeline';
import AddIcon from '@mui/icons-material/Add';
import ListIcon from '@mui/icons-material/List';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

type SidebarProps = {
  open: boolean;
  variant?: "permanent" | "persistent" | "temporary";
  onClose?: () => void;
};

export const Sidebar = ({ open, variant, onClose }: SidebarProps) => {
  const [goalsOpen, setGoalsOpen] = useState(false);

  const handleGoalsToggle = () => {
    setGoalsOpen(!goalsOpen);
  };

  const handleItemClick = () => {
    if (variant === "temporary" && onClose) {
      onClose();
    }
  };
  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: SIDEBAR_WIDTH,
          boxSizing: "border-box",
        },
      }}
    >
      {/* keep a small Toolbar to align with AppBar but reduce top gap */}
      <Toolbar sx={(theme) => ({ ...theme.mixins.toolbar, p: 0 })} />

      {/* Logo area: centered, compact spacing */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 2,
          py: 0.5, // tighter vertical padding
        }}
      >
        <Box
          component="img"
          src={Logo}
          alt="Logo"
          sx={{
            width: "60%", // responsive width inside sidebar
            maxWidth: 120,
            height: "auto",
            objectFit: "contain",
            mt: 0,
            mb: 0.5, // small gap to company name
          }}
        />

        <Typography variant="subtitle2" align="center" sx={{ fontWeight: 700, mt: 0 }}>
          SSS pvt ltd
        </Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      <List>
        {/* Dashboard */}
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to={DASHBOARD}
            onClick={handleItemClick}
            sx={{ pl: 2, borderRadius: 1, alignItems: 'center', '&:hover': { backgroundColor: 'action.hover' } }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <DashboardIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }} />
          </ListItemButton>
        </ListItem>

        {/* Goals with Sub-menu */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={handleGoalsToggle}
            sx={{ pl: 2, borderRadius: 1, alignItems: 'center', '&:hover': { backgroundColor: 'action.hover' } }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <ReceiptLongIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Goals" primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }} />
            {goalsOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        {/* Goals Sub-menu */}
        <Collapse in={goalsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to={ADD_GOAL}
                onClick={handleItemClick}
                sx={{ 
                  pl: 4, 
                  borderRadius: 1, 
                  alignItems: 'center', 
                  '&:hover': { backgroundColor: 'action.hover' },
                  backgroundColor: 'rgba(0, 0, 0, 0.04)' // Slightly different background for sub-items
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <AddIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="Add New Goal" 
                  primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }} 
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                component={Link}
                to="/goals/list"
                onClick={handleItemClick}
                sx={{ 
                  pl: 4, 
                  borderRadius: 1, 
                  alignItems: 'center', 
                  '&:hover': { backgroundColor: 'action.hover' },
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }}
              >
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <ListIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText 
                  primary="View Goals" 
                  primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }} 
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        {/* Transactions */}
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to={TRANSACTIONS}
            onClick={handleItemClick}
            sx={{ pl: 2, borderRadius: 1, alignItems: 'center', '&:hover': { backgroundColor: 'action.hover' } }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <TimelineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Transactions" primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }} />
          </ListItemButton>
        </ListItem>

        {/* Reports */}
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to={REPORTS}
            onClick={handleItemClick}
            sx={{ pl: 2, borderRadius: 1, alignItems: 'center', '&:hover': { backgroundColor: 'action.hover' } }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <TimelineIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Reports" primaryTypographyProps={{ variant: 'body2', fontWeight: 600 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};
