import { useEffect } from "react";
import { isTokenValid, logoutUser, getUserData } from "../helpers/tokenValidator";
import { jwtDecode } from "jwt-decode";

export default function useAuthCheck() {
    useEffect(() => {
        if (!isTokenValid()) {
            logoutUser();
            return;
        }

        const userData = getUserData();
        console.log(userData)
        const currentPath = window.location.pathname; // Get the current path

        // Redirect admin users to the admin panel
       /* if (userData?.user?.name === "Administrator") {
            if (!currentPath.includes("/admin")) {
                window.location.href = "/auth/admin/login";
            }
        } else {
            // Redirect non-admin users away from admin pages
            if (currentPath.includes("/admin")) {
                window.location.href = "/";
            }
        } */

        // Auto logout when token expires
        const token = localStorage.getItem("kuduUserToken");
        if (token) {
            const decoded = jwtDecode(token);
            const timeLeft = decoded.exp * 1000 - Date.now();
            if (timeLeft > 0) {
                const timer = setTimeout(() => {
                    logoutUser();
                }, timeLeft);

                return () => clearTimeout(timer); // Cleanup on unmount
            }
        }
    }, []); // Remove dependencies since we are not using `useLocation`
}
