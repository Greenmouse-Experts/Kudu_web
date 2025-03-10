import LandingLayout from "../layouts/landing";
import ViewProduct from "../modules/Products/viewProduct";
import CategoriesProduct from "../modules/Products/categoriesProduct";

export const productRoutes = [
    {
        path: '/',
        element: <LandingLayout />,
        children: [
            {
                path: 'product/:id',
                element: <ViewProduct />
            },
            {
                path: 'products/categories/:id/:name',
                element: <CategoriesProduct />
            }        
        ],
    },
];
