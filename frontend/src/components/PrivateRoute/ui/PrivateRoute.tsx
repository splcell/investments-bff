import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useGetCurrentUserQuery } from "../../../redux/investmentsApi";

export const PrivateRoute = () => {
  const { data, isLoading } = useGetCurrentUserQuery();
  const location = useLocation();
  const pathname = location.pathname;

  const isAuthPage =
    pathname.includes("login") || pathname.includes("auth");

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (isAuthPage) {
    return null;
  }

  if (!data && !isAuthPage) {
    return <Navigate to="/login" replace />;
  }

  console.log(data, "data")

  return (
      <Outlet context={{data}}/>
  );
};
