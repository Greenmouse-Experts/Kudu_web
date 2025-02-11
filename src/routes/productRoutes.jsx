import LandingLayout from "../layouts/landing";
import ViewProduct from "../modules/Products/viewProduct";
import PostProduct from "../modules/Products/SellProduct";
import ProductDetails from "../modules/Products/SellProduct/productDetails"
import CategoriesProduct from "../modules/Products/categoriesProduct";

export const productRoutes = [
    {
        path: '/',
        element: <LandingLayout />,
        children: [
            {
                path: 'sell-product',
                element: <PostProduct />
            },
            {
                path: 'sell-product/productdetails',
                element: <ProductDetails />
            },
            {
                path: 'product/:id',
                element: <ViewProduct />
            },
            {
                path: 'products/categories/:id/:id',
                element: <CategoriesProduct />
            }        
        ],
    },
];
