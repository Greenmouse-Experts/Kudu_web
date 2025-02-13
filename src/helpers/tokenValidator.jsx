import { jwtDecode } from "jwt-decode";
import useAppState from "../hooks/appState";

export const isTokenValid = () => {
    const token = localStorage.getItem("kuduUserToken");
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 > Date.now(); // Token is valid if expiration time is in the future
    } catch (error) {
        return false; // Invalid token
    }
};

export const getUserData = () => {
    const {user} = useAppState();
    return user ? JSON.parse(user) : null;
};

export const logoutUser = () => {
    localStorage.removeItem("kuduUserToken");
    localStorage.removeItem("kuduUser");
    window.location.href = "/login"; // Redirect to login page
};
