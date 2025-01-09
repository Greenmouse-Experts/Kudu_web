import AdminLayout from "../layouts/admin";
import Dashboard from "../modules/SuperAdmin/Dashboard"

export const adminRoutes = [
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />
            }        
        ],
    },
];
