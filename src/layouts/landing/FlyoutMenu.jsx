import { useState } from "react";
import Imgix from "react-imgix";
import { Link } from "react-router-dom";
import {
  Home,
  Mail,
  HelpCircle,
  Store,
  Megaphone,
  ShieldCheck,
  ScrollText,
  MessageSquareQuote,
  Users,
} from "lucide-react";

const FlyoutMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Menu Button */}
      <button
        className="bg-[#FFF2EA] border border-black text-black py-2 px-2 rounded-full flex items-center gap-2"
        onClick={() => setOpen((prev) => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-7 h-7 stroke-black"
        >
          <path
            d="M4 6h16M4 12h16M4 18h16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Flyout Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] bg-white transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-black text-xl"
          onClick={() => setOpen(false)}
        >
          ✖
        </button>

        {/* Menu Items */}
        <nav className="mt-12 text-left flex flex-col">
          <div className='flex justify-center'>
                    <Link to={'/'}>
                        <Imgix
                            src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1737497178/kuduMart/kudum_2_c8qm7a.png"
                            sizes="20vw"
                            width={160}
                            height={33}
                        />
                    </Link>
                </div>
          <Link
            to="/"
            className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200 flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200 flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            About Us
          </Link>
          <Link
            to="/testimonial"
            className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200 flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <MessageSquareQuote size={20} style={{ color: "#ff6f22" }} />
            Testimonial
          </Link>
          <Link
            to="/contact"
            className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200 flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/faqs"
            className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200 flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            FAQs
          </Link>

          <Link
            to="/"
            className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200 flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <Store size={20} style={{ color: "#ff6f22" }} />
            Become a Vendor
          </Link>

          <Link
            to="/"
            className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200 flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <Megaphone size={20} style={{ color: "#ff6f22" }} />
            Advertise with Us
          </Link>

          <Link
            to="/privacy"
            className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200 flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <ShieldCheck size={20} style={{ color: "#ff6f22" }} />
            Privacy Policy
          </Link>

          <Link
            to="/terms-condition"
            className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200 flex items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <ScrollText size={20} style={{ color: "#ff6f22" }} />
            Terms and Conditions
          </Link>
        </nav>
      </div>

      {open && (
        <div
          className="fixed inset-0opacity-30"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </>
  );
};

export default FlyoutMenu;
