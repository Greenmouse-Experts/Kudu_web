import LandingLayout from "../layouts/landing";
import Cart from "../modules/Cart";
import LandingHomepage from "../modules/Home";
import Messages from "../modules/Messages";

export const landingRooutes = [
    {
        path: '/',
        element: <LandingLayout />,
        children: [
          {
            index: true,
            element: <LandingHomepage />,
          },
          {
            path: 'cart',
            element: <Cart />
          },
        ],
    },
    {
      path: '/messages',
      element: <Messages />
    }
];
