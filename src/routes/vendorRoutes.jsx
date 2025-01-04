
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
            }        
        ],
    },
];
