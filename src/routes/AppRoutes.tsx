import { Routes, Route, Navigate } from "react-router-dom";
import { routesConfig } from "./config";
import { ProtectedRoute } from "./ProtectedRoute";
import { Layout } from "../components/layout/Layout";
import NotFound from "../pages/NotFound";
import { LOGIN } from "../codes/routes";
const AppRoutes = () => {
  return (
   <Routes>
      {/* Redirect root ("/") → /login */}
      <Route path="/" element={<Navigate to={LOGIN} replace />} />

      {routesConfig.map(({ path, element, public: isPublic }) =>
        isPublic ? (
          <Route key={path} path={path} element={element} />
        ) : (
          <Route key={path} element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path={path} element={element} />
            </Route>
          </Route>
        )
      )}

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
