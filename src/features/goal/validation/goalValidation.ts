import * as Yup from "yup";

// Goal validation schema
export const goalValidationSchema = Yup.object({
  goal_title: Yup.string()
    .min(3, "Goal title must be at least 3 characters")
    .max(100, "Goal title must be less than 100 characters")
    .required("Goal title is required"),
  
  description: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters")
    .required("Description is required"),
  
  goal_type: Yup.string()
    .oneOf(["daily", "weekly", "monthly"], "Please select a valid goal type")
    .required("Goal type is required"),
  
  start_date: Yup.date()
    .min(new Date(), "Start date cannot be in the past")
    .required("Start date is required"),
  
  end_date: Yup.date()
    .min(Yup.ref("start_date"), "End date must be after start date")
    .required("End date is required"),
  
  priority: Yup.string()
    .oneOf(["low", "medium", "high"], "Please select a valid priority")
    .required("Priority is required"),
  
  category: Yup.string()
    .min(2, "Category must be at least 2 characters")
    .required("Category is required"),
});