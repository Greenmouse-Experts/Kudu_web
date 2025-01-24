import React from "react";
import AdminLayout from "../layouts/admin";
import Dashboard from "../modules/SuperAdmin/Dashboard";
import Users from '../modules/SuperAdmin/Dashboard/users.jsx'; 
import Vendors from '../modules/SuperAdmin/Dashboard/vendors.jsx'; 
import Products from '../modules/SuperAdmin/Dashboard/productsA.jsx'; 
import Subscription from "../modules/SuperAdmin/Dashboard/subscriptions.jsx";
import Orders from '../modules/SuperAdmin/Dashboard/order.jsx'; 
import Transactions from '../modules/SuperAdmin/Dashboard/transactions.jsx'; 
import CreateSubscription from "../modules/SuperAdmin/Dashboard/createSubscription.jsx";
import ProductCategories from "../modules/SuperAdmin/Dashboard/productCategories.jsx";
import AddProductCategory from "../modules/SuperAdmin/Dashboard/addProductCategory.jsx";
import Settings from "../modules/SuperAdmin/Dashboard/settings.jsx";
import SubLevel from "../modules/SuperAdmin/Dashboard/sublevel.jsx";
import AdminAdverts from "../modules/SuperAdmin/Dashboard/adverts.jsx";
import PostNewAdvert from "../modules/SuperAdmin/Dashboard/postadverts.jsx";
import AllStores from "../modules/SuperAdmin/Dashboard/stores.jsx";
import MyStores from "../modules/SuperAdmin/Dashboard/mystores.jsx";
import AddNewStore from "../modules/SuperAdmin/Dashboard/newStore.jsx";

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
                path: "products-categories",
                element: <ProductCategories />,
            },
            {
                path: "products-categories/add-category",
                element: <AddProductCategory />,
            },
            {
                path: "subscriptions",
                element: <Subscription />
            },
            {
                path: "subscriptions/create",
                element: <CreateSubscription />
            },
            {
                path: "orders",
                element: <Orders />,
            },
            {
                path: "transactions",
                element: <Transactions />,
            },
            {
                path: "settings",
                element: <Settings />,
            },
            {
                path: "sublevel",
                element: <SubLevel />,
            },
            {
                path: "adverts",
                element: <AdminAdverts />,
            },
            {
                path: "postadverts",
                element: <PostNewAdvert />,
            },
            {
                path: "all-stores",
                element: <AllStores />,
            },
            {
                path: "my-stores",
                element: <MyStores />,
            },
            {
                path: "new-stores",
                element: <AddNewStore />,
            },
        ],
    },
];
