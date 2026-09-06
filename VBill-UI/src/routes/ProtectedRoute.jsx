import React from "react";
import {
    Navigate,
    Outlet,
    useLocation
} from "react-router-dom";

export default function ProtectedRoute() {

    const location = useLocation();

    const token = sessionStorage.getItem("token");

    /*
     * No token means user is not logged in.
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
     * Token exists.
     * Allow protected child route to render.
     */
    return <Outlet />;
}