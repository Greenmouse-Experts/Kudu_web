import React from "react";
import AdminLayout from "../layouts/admin";
import Dashboard from "../modules/SuperAdmin/Dashboard";
import Users from '../modules/SuperAdmin/Dashboard/users.jsx'; 
import Vendors from '../modules/SuperAdmin/Dashboard/vendors.jsx'; 
import Products from '../modules/SuperAdmin/Dashboard/productsA.jsx'; 

export const adminRoutes = [
    {
        path: "/admin/*",
        element: <AdminLayout />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
            {
                path: "all-customers",
                element: <Users />,
            },
            {
                path: "all-vendors",
                element: <Vendors />,
            },
            {
                path: "products-sell",
                element: <Products />,
            },
        ],
    },
];
