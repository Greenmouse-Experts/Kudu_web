import { useState } from "react";
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
        <nav className="mt-12 text-center flex flex-col">
          <Link
            to="/"
            className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200"
          >
            Contact
          </Link>
          <Link
            to="/faqs"
            className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200"
          >
            FAQs
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
