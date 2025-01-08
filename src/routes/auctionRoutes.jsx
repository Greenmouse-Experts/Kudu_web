import LandingLayout from "../layouts/landing";
import AuctionPage from "../modules/Auction";
import ViewAuctionProduct from "../modules/Auction/product";

export const auctionRoutes = [
    {
        path: '/',
        element: <LandingLayout />,
        children: [
            {
                path: 'auction',
                element: <AuctionPage />
            },
            {
                path: 'auction/product/:id',
                element: <ViewAuctionProduct />
            }
        ],
    },
];
