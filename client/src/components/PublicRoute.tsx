import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth()!;

  // If user is logged in, redirect to dashboard
  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;
