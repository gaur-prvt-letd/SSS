// src/features/auth/LoginForm.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./authSlice";
import {
  Box,
  Typography,
  Container,
  Paper,
  Avatar,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Input } from "../../components/common/CustomInput";
import { Button } from "../../components/common/CustomButton";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginImage from "../../assets/LoginImage.jpeg";
import pkg from "../../../package.json";

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      login({
        name: "John Doe",
        id: "some-id", // Replace with actual id if available
      })
    );
    navigate("/dashboard");
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Container
      component="main"
      maxWidth={false}
      disableGutters
      sx={{ px: { xs: 1, sm: 2, md: 3 } }}
    >
      {/* Top-right Sign Up button */}
      <Box
        sx={{
          position: "fixed",
          top: 24,
          right: 24,
          zIndex: (theme) => theme.zIndex.appBar + 1,
        }}
      >
        <Button variant="outlined" onClick={() => navigate("/register")}>
          Sign Up
        </Button>
      </Box>
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh", py: 2 }}
      >
        {/* Left: Illustration/Image */}
        <Grid item xs={12} md={8}>
          <Box
            component="img"
            src={LoginImage}
            alt="Welcome"
            sx={{
              width: "100%",
              height: { xs: 220, sm: 300, md: 380 },
              objectFit: "cover",
              borderRadius: 2,
              boxShadow: 3,
              mt: 5
            }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mt: 2 }}
          >
            Welcome back! Please enter your details to log in. V{pkg.version}
          </Typography>
        </Grid>

        {/* Right: Login Card */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: { xs: 3, md: 4 } }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
            </Box>
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Input
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

