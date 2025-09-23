import DashboardPage from "../features/dashboard/pages/DashboardPage";
import { LoginForm } from "../features/auth/LoginForm";
import TransactionsPage from "../pages/TransactionsPage";
import Reports from "../pages/Reports";
import  RegisterForm from "../features/auth/RegisterForm";

export const routesConfig = [
  { path: "/login", element: <LoginForm />, public: true },
  { path: "/register", element: <RegisterForm />, public: true },
  { path: "/dashboard", element: <DashboardPage />, public: false },
  { path: "/transactions", element: <TransactionsPage />, public: false },
  { path: "/reports", element: <Reports />, public: false },
  
];

export default routesConfig;
