import DashboardPage from "../features/dashboard/pages/DashboardPage";
import { LoginForm } from "../features/auth/LoginForm";
import TransactionsPage from "../pages/TransactionsPage";
import Reports from "../pages/Reports";

export const routesConfig = [
  { path: "/login", element: <LoginForm />, public: true },
  { path: "/register", element: <div>Register</div>, public: true },
  { path: "/dashboard", element: <DashboardPage />, public: false },
  { path: "/transactions", element: <TransactionsPage />, public: false },
  { path: "/reports", element: <Reports />, public: false },
  
];

export default routesConfig;
