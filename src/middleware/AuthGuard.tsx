import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuard() {
  const isAuthenticated = localStorage.getItem("authToken");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
