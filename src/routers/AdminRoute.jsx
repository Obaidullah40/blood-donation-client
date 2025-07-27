// src/routes/AdminRoute.jsx
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../pages/shared/Loading";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { user} = useAuth();
  const { role, loading } = useRole();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user && role === "admin") {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
