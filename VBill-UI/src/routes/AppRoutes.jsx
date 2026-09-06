import {
    createBrowserRouter,
    RouterProvider,
    Navigate
} from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard";

import BusinessInformation from "../pages/Masters/Setups/BusinessInformation";
import Uom from "../pages/Masters/Setups/Uom";
import Category from "../pages/Masters/Setups/Category";
import TaxCode from "../pages/Masters/Setups/TaxCode";
import RegionalSettings from "../pages/Masters/Setups/RegionalSettings";
import Location from "../pages/Masters/Setups/Location";
import Item from "../pages/Masters/Item";

import Signup from "../components/Authentication/Signup";
import Login from "../components/Authentication/Login";
import ForgotPassword from "../components/Authentication/ForgotPassword";

import AuthGuard from "../components/Authentication/AuthGuard";
import Customer from "../pages/Masters/Customer";
import Vendor from "../pages/Masters/Vendor";


const router = createBrowserRouter([

    // =====================================================
    // ROOT
    // =====================================================

    {
        path: "/",
        element: <Navigate to="/login" replace />,
    },


    // =====================================================
    // AUTHENTICATION ROUTES
    // These are PUBLIC
    // =====================================================

    {
        path: "/login",
        element: <Login />,
    },

    {
        path: "/signup",
        element: <Signup />,
    },

    {
        path: "/forgotpassword",
        element: <ForgotPassword />,
    },


    // =====================================================
    // PROTECTED APPLICATION ROUTES
    // =====================================================

    {
        path: "/",
        element: <AuthGuard />,

        children: [

            {
                element: <AdminLayout />,

                children: [

                    {
                        path: "dashboard",
                        element: <AdminDashboard />,
                    },

                    {
                        path: "businessinformation",
                        element: <BusinessInformation />,
                    },

                    {
                        path: "uom",
                        element: <Uom />,
                    },

                    {
                        path: "category",
                        element: <Category />,
                    },

                    {
                        path: "taxcode",
                        element: <TaxCode />,
                    },

                    {
                        path: "regionalsettings",
                        element: <RegionalSettings />,
                    },

                    {
                        path: "location",
                        element: <Location />,
                    },

                    {
                        path: "item",
                        element: <Item />,
                    },
                    {
                        path: "customer",
                        element: <Customer />,
                    },
                    {
                        path: "vendor",
                        element: <Vendor />,
                    },

                ],
            },

        ],
    },

]);


function AppRoutes() {

    return (
        <RouterProvider router={router} />
    );

}

export default AppRoutes;