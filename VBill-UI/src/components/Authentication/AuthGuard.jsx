import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AuthGuard() {

    const location = useLocation();

    let token = null;

    try {

        token = sessionStorage.getItem("token");

    } catch (error) {

        console.warn(
            "Session storage is not accessible. Redirecting to login."
        );

        token = null;
    }

    /*
     * No token = user is not logged in
     */
    if (!token) {

        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location.pathname
                }}
            />
        );
    }

    /*
     * Token exists
     * Allow application routes
     */
    return <Outlet />;
}