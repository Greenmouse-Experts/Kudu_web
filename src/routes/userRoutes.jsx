import LandingLayout from "../layouts/landing";
import UserProfile from "../modules/User";
import ProfileOrders from "../modules/User/modules/orders";
import AccountProfile from "../modules/User/modules/profile";

export const userRoutes = [
    {
        path: '/',
        element: <LandingLayout />,
        children: [
            {
                path: ':id',
                element: <UserProfile />,
                children: [
                    {
                        index: true,
                        element: <AccountProfile />
                    },
                    {
                        path: 'orders',
                        element: <ProfileOrders />
                    }        
                ]
            },
        ],
    },
];
