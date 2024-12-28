import LandingLayout from "../layouts";
import LandingHomepage from "../modules/Home";

export const landingRooutes = [
    {
        path: '/',
        element: <LandingLayout />,
        children: [
          {
            index: true,
            element: <LandingHomepage />,
          },
        ],
    },
];
