// src/features/auth/LoginForm.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login } from "./authSlice";
import {
  Box,
  Typography,
  Container,
  Paper,
  Avatar,
  InputAdornment,
  IconButton,
  Grid,
  Alert,
} from "@mui/material";
import { Input } from "../../components/common/CustomInput";
import { Button } from "../../components/common/CustomButton";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginImage from "../../assets/LoginImage.jpeg";
import { authApi } from "../../services/api";
import pkg from "../../../package.json";

// Validation schema
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setError("");
      
      try {
        // Call login API
        const response = await authApi.login({
          email: values.email,
          password: values.password,
        });

        const { access_token } = response.data;
        
        // Store token in localStorage
        localStorage.setItem("access_token", access_token);
        
        // Dispatch login action with user data and token
        dispatch(login({
          name: "John Doe", // You can extract from token or make another API call
          id: "user-id", // Extract from token or API response
        }));
        
        console.log('Login successful:', response.data);
        
        // Navigate to dashboard
        navigate("/dashboard");
      } catch (error: unknown) {
        console.error('Login failed:', error);
        
        // Handle different error types
        if (error && typeof error === 'object' && 'response' in error) {
          const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
          if (axiosError.response?.data?.message) {
            setError(axiosError.response.data.message);
          } else if (axiosError.message) {
            setError(axiosError.message);
          } else {
            setError("Login failed. Please try again.");
          }
        } else {
          setError("Login failed. Please try again.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

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
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
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
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
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
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
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

              {error ? (
                <Box sx={{ mt: 2 }}>
                  <Alert severity="error">{error}</Alert>
                </Box>
              ) : null}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={formik.isSubmitting}
                sx={{ mt: 3, mb: 2 }}
              >
                {formik.isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

