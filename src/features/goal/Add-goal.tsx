import React, { useState } from "react";
import { useFormik } from "formik";
import {
  Box,
  Typography,
  Container,
  Paper,
  Grid,
  Alert,
  MenuItem,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Input } from "../../components/common/CustomInput";
import { Button } from "../../components/common/CustomButton";
import { goalValidationSchema } from "./validation/goalValidation";
import { goalApi } from "../../services/api";

// Helper function to calculate end date based on goal type
const calculateEndDate = (start_date: string, goal_type: string): string => {
  if (!start_date || !goal_type) return start_date;

  const start = new Date(start_date);

  switch (goal_type) {
    case "daily":
      return start_date; // Same day for daily goals
    case "weekly": {
      const weekEnd = new Date(start);
      weekEnd.setDate(start.getDate() + 6); // Add 6 days (7 total including start)
      return weekEnd.toISOString().split("T")[0];
    }
    case "monthly": {
      const monthEnd = new Date(start);
      monthEnd.setMonth(start.getMonth() + 1);
      monthEnd.setDate(monthEnd.getDate() - 1); // Last day of the month
      return monthEnd.toISOString().split("T")[0];
    }
    default:
      return start_date;
  }
};

// Get today's date in YYYY-MM-DD format
const getTodayDate = (): string => {
  return new Date().toISOString().split("T")[0];
};

function AddGoal() {
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      goal_title: "",
      description: "",
      goal_type: "",
      start_date: getTodayDate(),
      end_date: getTodayDate(),
      priority: "",
      category: "",
    },
    validationSchema: goalValidationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setError("");

      try {
        console.log("Goal Form Values:", values);

        // Check if token exists in localStorage
        const token = localStorage.getItem("access_token");
        console.log(
          "Token from localStorage:",
          token ? "Token exists" : "No token found"
        );

        if (!token) {
          setError(
            "You must be logged in to create a goal. Please login first."
          );
          setSubmitting(false);
          return;
        }

        // Call the API to save the goal
        const goalPayload = {
          goal_title: values.goal_title,
          description: values.description,
          goal_type: values.goal_type,
          start_date: values.start_date,
          end_date: values.end_date,
          priority: values.priority,
          category: values.category,
        };

        console.log("📤 Sending goal payload:", goalPayload);

        const response = await goalApi.createGoal(goalPayload);

        console.log("Goal created successfully:", response.data);

        // Reset form after successful submission
        resetForm();

        // Show success message
        alert("Goal created successfully!");
      } catch (error: unknown) {
        console.error("Failed to create goal:", error);

        // Handle different error types
        if (error && typeof error === "object" && "response" in error) {
          const axiosError = error as {
            response?: { data?: { message?: string } };
            message?: string;
          };
          if (axiosError.response?.data?.message) {
            setError(axiosError.response.data.message);
          } else if (axiosError.message) {
            setError(axiosError.message);
          } else {
            setError("Failed to create goal. Please try again.");
          }
        } else {
          setError("Failed to create goal. Please try again.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Handle goal type change to auto-calculate end date
  const handleGoalTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const goal_type = event.target.value;
    formik.setFieldValue("goal_type", goal_type);

    // Auto-calculate end date based on goal type
    const end_date = calculateEndDate(formik.values.start_date, goal_type);
    formik.setFieldValue("end_date", end_date);
  };

  // Handle start date change to recalculate end date
  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const start_date = event.target.value;
    formik.setFieldValue("start_date", start_date);

    // Recalculate end date if goal type is selected
    if (formik.values.goal_type) {
      const end_date = calculateEndDate(start_date, formik.values.goal_type);
      formik.setFieldValue("end_date", end_date);
    }
  };

  return (
    <Container component="main" maxWidth="md" >
      <Paper elevation={3} sx={{ p: { xs: 3, md: 4 } }}>
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={3}>
            {/* Goal goal_title */}
            <Grid item xs={12}>
              <Input
                required
                fullWidth
                id="goal_title"
                label="Goal goal_title"
                name="goal_title"
                placeholder="Enter your goal goal_title"
                value={formik.values.goal_title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.goal_title && Boolean(formik.errors.goal_title)
                }
                helperText={
                  formik.touched.goal_title && formik.errors.goal_title
                }
              />
            </Grid>

            {/* Description */}
            <Grid item xs={12}>
              <Input
                required
                fullWidth
                multiline
                rows={4}
                id="description"
                label="Description"
                name="description"
                placeholder="Describe your goal in detail"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
              />
            </Grid>

            {/* Goal Type and Priority */}
            <Grid item xs={12} md={6}>
              <Input
                required
                fullWidth
                select
                id="goal_type"
                label="Goal Type"
                name="goal_type"
                value={formik.values.goal_type}
                onChange={handleGoalTypeChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.goal_type && Boolean(formik.errors.goal_type)
                }
                helperText={formik.touched.goal_type && formik.errors.goal_type}
              >
                <MenuItem value="daily">Daily Goal</MenuItem>
                <MenuItem value="weekly">Weekly Goal</MenuItem>
                <MenuItem value="monthly">Monthly Goal</MenuItem>
              </Input>
            </Grid>

            <Grid item xs={12} md={6}>
              <Input
                required
                fullWidth
                select
                id="priority"
                label="Priority"
                name="priority"
                value={formik.values.priority}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.priority && Boolean(formik.errors.priority)
                }
                helperText={formik.touched.priority && formik.errors.priority}
              >
                <MenuItem value="low">Low Priority</MenuItem>
                <MenuItem value="medium">Medium Priority</MenuItem>
                <MenuItem value="high">High Priority</MenuItem>
              </Input>
            </Grid>

            {/* Category */}
            <Grid item xs={12} md={6}>
              <Input
                required
                fullWidth
                id="category"
                label="Category"
                name="category"
                placeholder="e.g., Health, Career, Personal"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
                helperText={formik.touched.category && formik.errors.category}
              />
            </Grid>

            {/* Start Date */}
            <Grid item xs={12} md={6}>
              <Input
                required
                fullWidth
                type="date"
                id="start_date"
                label="Start Date"
                name="start_date"
                value={formik.values.start_date}
                onChange={handleStartDateChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.start_date && Boolean(formik.errors.start_date)
                }
                helperText={
                  formik.touched.start_date && formik.errors.start_date
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* End Date */}
            <Grid item xs={12} md={6}>
              <Input
                required
                fullWidth
                type="date"
                id="end_date"
                label="End Date"
                name="end_date"
                value={formik.values.end_date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.end_date && Boolean(formik.errors.end_date)
                }
                helperText={formik.touched.end_date && formik.errors.end_date}
                disabled={!formik.values.goal_type} // Disabled until goal type is selected
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box sx={{ mt: 2 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={formik.isSubmitting}
                  sx={{ py: 1.5 }}
                >
                  {formik.isSubmitting ? "Creating Goal..." : "Save Goal"}
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Show validation summary if there are errors */}
          {error && (
            <Box sx={{ mt: 2 }}>
              <Alert severity="error">{error}</Alert>
            </Box>
          )}

          {formik.submitCount > 0 && Object.keys(formik.errors).length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Alert severity="error">
                Please fix the errors above before submitting the form.
              </Alert>
            </Box>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default AddGoal;
