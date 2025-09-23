import DashboardPage from "../features/dashboard/pages/DashboardPage";
import { LoginForm } from "../features/auth/LoginForm";
import TransactionsPage from "../pages/TransactionsPage";
import { DASHBOARD, LOGIN, TRANSACTIONS } from "../codes/routes";

export const routesConfig = [
  { path: LOGIN, element: <LoginForm />, public: true },
  { path: DASHBOARD, element: <DashboardPage /> },
  { path: TRANSACTIONS, element: <TransactionsPage /> },
];
