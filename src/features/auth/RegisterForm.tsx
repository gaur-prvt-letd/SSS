import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
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
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoginImage from "../../assets/LoginImage.jpeg";
import { Input } from "../../components/common/CustomInput";
import { Button } from "../../components/common/CustomButton";
import { authApi } from "../../services/api";

// Validation schema
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setError("");
      
      try {
        // Call register API with the required payload format
        const payload = {
          name: values.name,
          email: values.email,
          mobile: "", // Provide a default or collect from user
          password: values.password,
        };

        const response = await authApi.register(payload);
        console.log('Registration successful:', response.data);
        
        // Navigate to login page on successful registration
        navigate("/login");
      } catch (error: unknown) {
        console.error('Registration failed:', error);
        
        // Handle different error types
        if (error && typeof error === 'object' && 'response' in error) {
          const axiosError = error as { response?: { data?: { message?: string } }; message?: string };
          if (axiosError.response?.data?.message) {
            setError(axiosError.response.data.message);
          } else if (axiosError.message) {
            setError(axiosError.message);
          } else {
            setError("Registration failed. Please try again.");
          }
        } else {
          setError("Registration failed. Please try again.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleClickShowPassword = () => setShowPassword((s) => !s);
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
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh", py: 2 }}
      >
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={LoginImage}
            alt="Register"
            sx={{
              width: "100%",
              height: { xs: 260, sm: 360, md: 620 },
              objectFit: "cover",
              borderRadius: 2,
              boxShadow: 3,
            }}
          />
        </Grid>

        <Grid item xs={12} md={5}>
          <Paper elevation={3} sx={{ p: { xs: 3, md: 4 } }}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <PersonAddIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Create account
              </Typography>
            </Box>

            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Input
                    required
                    fullWidth
                    id="name"
                    label="Full name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Input
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
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
                <Grid item xs={12}>
                  <Input
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm password"
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
                {formik.isSubmitting ? "Creating account..." : "Create account"}
              </Button>

              <Box textAlign="center">
                <Button variant="text" onClick={() => navigate("/login")}>
                  Already have an account? Sign in
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default RegisterForm;
