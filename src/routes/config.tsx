import HomePage from "../pages/HomePage";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import NotFound from "../pages/NotFound";
import { LoginForm } from "../features/auth/LoginForm";

// Define route metadata type
export interface AppRoute {
  path: string;
  element: React.ReactNode;
  label?: string; // for menus/sidebar
  icon?: React.ReactNode; // optional MUI/React icon
  isProtected?: boolean; // for auth guard
  layout?: boolean; // whether to wrap in <Layout />
}

// Centralized config
export const appRoutes: AppRoute[] = [
  {
    path: "/login",
    element: <LoginForm />,
    label: "Login",
    isProtected: false,
  },
  {
    path: "/",
    element: <HomePage />,
    label: "Home",
    isProtected: true,
    layout: true,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    label: "Dashboard",
    isProtected: true,
    layout: true,
  },
  {
    path: "*",
    element: <NotFound />,
    label: "404",
    isProtected: false,
  },
];
