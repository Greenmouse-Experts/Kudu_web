import Login from "../modules/Auth/login";
import SignUp from "../modules/Auth/signUp";

export const authRoutes = [
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/sign-up',
        element: <SignUp />,
    }
];
