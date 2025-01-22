import React from "react";
import AdminLayout from "../layouts/admin";
import Dashboard from "../modules/SuperAdmin/Dashboard";
import Users from '../modules/SuperAdmin/Dashboard/users.jsx'; 
import Vendors from '../modules/SuperAdmin/Dashboard/vendors.jsx'; 
import Products from '../modules/SuperAdmin/Dashboard/productsA.jsx'; 
import Orders from '../modules/SuperAdmin/Dashboard/order.jsx'; 
import Transactions from '../modules/SuperAdmin/Dashboard/transactions.jsx'; 
// import SubLevel from "../modules/SuperAdmin/Dashboard/sublevel.jsx";

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
            {
                path: "orders",
                element: <Orders />,
            },
            {
                path: "transactions",
                element: <Transactions />,
            },
            // {
            //     path: "sublevel",
            //     element: <SubLevel />,
            // },
            
        ],
    },
];
