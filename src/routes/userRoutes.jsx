import LandingLayout from "../layouts/landing";
import UserProfile from "../modules/User";
import ProfileOrders from "../modules/User/modules/orders";
import UpdatedKYC from "../modules/User/modules/kyc";
import Stores from "../modules/User/modules/stores";
import AccountProfile from "../modules/User/modules/profile";

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
                ]
            },
        ],
    },
];
