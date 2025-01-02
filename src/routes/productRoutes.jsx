import LandingLayout from "../layouts/landing";
import PostProduct from "../modules/SellProduct";
import ProductDetails from "../modules/SellProduct/productDetails";

export const productRoutes = [
    {
        path: '/sell-product',
        element: <LandingLayout />,
        children: [
            {
                index: true,
                element: <PostProduct />
            },
            {
                path: 'productdetails',
                element: <ProductDetails />
            }
        ],
    },
];
