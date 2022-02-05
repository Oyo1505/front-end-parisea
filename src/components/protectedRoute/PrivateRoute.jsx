import React from "react";
import useAuth from "../user/UseAuth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
	// const { isLoggedIn, isLoading } = useAuth();
    console.log(useAuth())
	// if (isLoading) return <p>Loading...</p>;
	// if (!isLoggedIn) return <Navigate to="/" />;
	// else return <Outlet />;
};

export default PrivateRoute;