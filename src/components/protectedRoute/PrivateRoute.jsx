import React from "react";
import useAuth from "../user/UseAuth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useAuth();
  if (currentUser.length === 0) return <Navigate to="/" />;
  else return <Outlet />;
};

export default PrivateRoute;
