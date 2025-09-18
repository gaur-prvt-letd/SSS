// src/components/layout/Navbar.tsx
import { AppBar, Toolbar, Typography, Box, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { ThemeToggleButton } from "../ThemeToggleButton";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { logout } from "../../features/auth/authSlice";
import { SIDEBAR_WIDTH } from "./constants";

type NavbarProps = {
  onMenuClick?: () => void;
  open?: boolean;
};

const Navbar = ({ onMenuClick, open }: NavbarProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <AppBar
      position="fixed"
      sx={{
        width: {
          sm: `calc(100% - ${open ? SIDEBAR_WIDTH : 0}px)`,
        },
        ml: { sm: `${open ? SIDEBAR_WIDTH : 0}px` },
        transition: (theme) =>
          theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}
    >
      <Toolbar>
        {/* Sidebar toggle button */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MY PERSONAL APP
        </Typography>

        <ThemeToggleButton />

        {user ? (
          <Box ml={2} display="flex" alignItems="center" gap={2}>
            <Typography variant="body1">{user.name}</Typography>
            <Button color="inherit" onClick={() => dispatch(logout())}>
              Logout
            </Button>
          </Box>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
