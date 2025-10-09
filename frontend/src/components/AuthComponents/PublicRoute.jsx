import { Outlet, Navigate } from "react-router";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { user, isLoggedin } = useSelector((state) => state.auth);

  if (user && isLoggedin) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
