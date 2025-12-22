import ErrorBoundary from "../components/ErrorBoundary";
import DropShippingProducts from "../modules/dropshipping";
import AddToStore from "../modules/dropshipping/products/components/AddToStore";
import AliProductDetails from "../modules/dropshipping/products/details";

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
      {
        path: "products/item/:itemId",
        element: <AliProductDetails />,
      },
      {
        path: "products/import/:itemId",
        element: <AddToStore />,
      },
    ],
  },
];
