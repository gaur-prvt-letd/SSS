import { Routes, Route } from "react-router-dom";
import { Layout } from "../components/layout/Layout"; 
import HomePage from  "../pages/HomePage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import NotFound from "../pages/NotFound";
import { ProtectedRoute } from "./ProtectedRoute";
import { LoginForm } from "../features/auth/LoginForm";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<LoginForm />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;