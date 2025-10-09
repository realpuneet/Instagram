import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { user, isLoggedin } = useSelector((state) => state.auth);

  if (!user || !isLoggedin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
