import ErrorBoundary from "../components/ErrorBoundary";
import DropShippingProducts from "../modules/dropshipping";

export const dropShippingRoutes = [
  {
    path: "/dropshipping/*",
    // element: (
    //   <AdminRouteGuard>
    //     <AdminLayout />
    //   </AdminRouteGuard>
    // ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "products",
        element: <DropShippingProducts />,
      },
    ],
  },
];
