import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  isPublicOnly?: boolean;
}

export function ProtectedRoute({ isPublicOnly = false }: ProtectedRouteProps) {
  const token = localStorage.getItem("@financy:token");

  if (isPublicOnly && token) {
    return <Navigate to="/" replace />;
  }

  if (!isPublicOnly && !token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
