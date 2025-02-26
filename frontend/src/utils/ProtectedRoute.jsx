import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const userRole = localStorage.getItem("role"); // Get user role from storage

  return allowedRoles.includes(userRole) ? <Outlet /> : <Navigate to="/home2" />;
};

export default ProtectedRoute;
