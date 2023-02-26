import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ user, children }) {
  if (!sessionStorage.getItem("jms_token")) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
