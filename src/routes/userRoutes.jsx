import LandingLayout from "../layouts/landing";
import UserProfile from "../modules/User";
import ProfileOrders from "../modules/User/modules/orders";
import UpdatedKYC from "../modules/User/modules/kyc";
import Stores from "../modules/User/modules/stores";
import AccountProfile from "../modules/User/modules/profile";
import MyProducts from "../modules/User/modules/MyProducts";
import Subscription from "../modules/User/modules/subscriptions";
import OrderDetails from "../modules/User/modules/ViewOrders";
import VendorAdverts from "../modules/User/modules/VendorAdverts";
import Notification from "../modules/Notification/Notification";
import PostNewAdvert from "../modules/User/modules/AddNewAdvert";
import UpdateAdvert from "../modules/User/modules/UpdateAdvert";
// import OrderDetails from "../modules/orders/OrderDetails";

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
                        path: 'orders/order-details/:id',
                        element: <OrderDetails />
                    },
                    {
                        path: 'view-orders',
                        element: <OrderDetails />
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
                        path: 'adverts/create-advert',
                        element: <PostNewAdvert />
                    },   
                    {
                        path: 'adverts/edit-advert/:id',
                        element: <UpdateAdvert />
                    },       
                    {
                        path: 'subscription',
                        element: <Subscription />
                    }, 
                    {
                        path: 'adverts',
                        element: <VendorAdverts />
                    }, 
                    {
                        path: 'notification',
                        element: <Notification />
                    }, 
                ]
            },
        ],
    },
];
