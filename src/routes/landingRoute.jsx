import LandingLayout from "../layouts/landing";
import Cart from "../modules/Cart";
import LandingHomepage from "../modules/Home";
import Messages from "../modules/Messages";
import Contact from "../modules/Home/contact";
import Faqs from "../modules/Home/faqs";
import Privacy from "../modules/Home/privacy";
import Condititons from "../modules/Home/conditions";
import Testimonial from "../modules/Home/testimonial";
import About from "../modules/Home/about";
import SellAll from "../modules/Home/SellAll";

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
          {
            path: 'messages',
            element: <Messages />
          },
          {
            path: 'contact',
            element: <Contact />
          },
          {
            path: 'faqs',
            element: < Faqs/>
          },
          {
            path: 'privacy',
            element: <Privacy/>
          },

          {
            path: 'terms-condition',
            element: <Condititons/>
          },

          {
            path: 'testimonial',
            element: <Testimonial/>
          },

          {
            path: 'about',
            element: <About/>
          },

          {
            path: 'see-all',
            element: <SellAll/>
          },
        ],
    },
];
