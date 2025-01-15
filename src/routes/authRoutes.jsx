import Login from "../modules/Auth/login";
import SignUp from "../modules/Auth/signUp";
import Forget from "../modules/Auth/forget";

export const authRoutes = [
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/sign-up',
        element: <SignUp />,
    },
    {
        path: '/forget',
        element: <Forget />,
    },
];
