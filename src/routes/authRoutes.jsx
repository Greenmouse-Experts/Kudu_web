import Login from "../modules/Auth/login";
import SignUp from "../modules/Auth/signUp";
import VerifyEmail from "../modules/Auth/verifyEmail";

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
        path: '/verify-email',
        element: <VerifyEmail />
    }
];
