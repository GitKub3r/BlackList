import { useAuth } from "../auth/AuthContext";
import { Navigate, Outlet } from "react-router";

export const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return null; // O un spinner de carga si prefieres
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
