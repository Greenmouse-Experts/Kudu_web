import LandingLayout from "../layouts/landing";
import Auction from "../modules/Auction";
import AllAuctions from "../modules/Auction/allAuctions";
import ViewAuctionProduct from "../modules/Auction/product";

export const auctionRoutes = [
    {
        path: '/',
        element: <LandingLayout />,
        children: [
            {
                path: 'auction',
                element: <Auction />
            },
            {
                path: 'auction/product/:id',
                element: <ViewAuctionProduct />
            },
            {
                path: 'auction/all-auctions',
                element: <AllAuctions />
            }
        ],
    },
];
