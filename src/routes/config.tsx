import DashboardPage from "../features/dashboard/pages/DashboardPage";
import { LoginForm } from "../features/auth/LoginForm";
// import Reports from "../pages/Reports";
// import  RegisterForm from "../features/auth/RegisterForm";
import AddGoal from "../features/goal/Add-goal";
import RegisterForm from "../features/auth/RegisterForm";
import GoalsList from "../features/goal/GoalsList";

export const routesConfig = [
  { path: "/login", element: <LoginForm />, public: true },
  { path: "/register", element: <RegisterForm />, public: true },
  { path: "/dashboard", element: <DashboardPage />, public: false },
  // { path: "/transactions", element: <TransactionsPage />, public: false },
  { path: "/add-goal", element: <AddGoal />, public: false },
  { path: "/reports", element: <div>Reports Page</div>, public: false },
  { path: "/goals/list", element: <GoalsList />, public: false },
];

export default routesConfig;
