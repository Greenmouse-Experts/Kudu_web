import LandingLayout from "../layouts/landing";
import UserProfile from "../modules/User";
import ProfileOrders from "../modules/User/modules/orders";
import UpdatedKYC from "../modules/User/modules/kyc";
import Stores from "../modules/User/modules/stores";
import AccountProfile from "../modules/User/modules/profile";
import MyProducts from "../modules/User/modules/MyProducts";
import Subscription from "../modules/User/modules/subscriptions";

export const userRoutes = [
    {
        path: '/',
        element: <LandingLayout />,
        children: [
            {
                path: 'profile',
                element: <UserProfile />,
                children: [
                    {
                        index: true,
                        element: <AccountProfile />
                    },
                    {
                        path: 'orders',
                        element: <ProfileOrders />
                    },
                    {
                        path: 'updated-kyc',
                        element: <UpdatedKYC />
                    },
                    {
                        path: 'stores',
                        element: <Stores />
                    },   
                    {
                        path: 'products',
                        element: <MyProducts />
                    },   
                    {
                        path: 'subscription',
                        element: <Subscription />
                    }, 
                ]
            },
        ],
    },
];
