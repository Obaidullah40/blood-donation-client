import { Navigate, useLocation } from "react-router";
import useRole from "../hooks/useRole";
import Loading from "../pages/shared/Loading";

const RoleRoute = ({ allowedRoles, children }) => {
  const location = useLocation();
  const { role, loading } = useRole();

  if (loading) return <Loading />;

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default RoleRoute;
