import { Accordion, AccordionBody, AccordionHeader } from "@material-tailwind/react";
import { useState } from "react";
import Imgix from "react-imgix";
import { Link, useNavigate } from "react-router-dom";
import useAppState from "../../hooks/appState";
import { useModal } from "../../hooks/modal";
import SwitchVendorModal from "../../modules/User/components/switchVendor";
import LogOutModal from "../../components/LogOut";
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
    UserPlus,
    Hammer,
} from "lucide-react";

export default function Sidebar({ onSelected }) {
    const [open, setOpen] = useState(false);
    const { user } = useAppState();
    const { openModal } = useModal();
    const navigate = useNavigate();

    const handleClose = () => {
        setOpen(false);
        if (onSelected) onSelected(); // Call parent handler if passed
    };

    const handleOpen = () => setOpen(!open);

    const authOptions = [
        {
            value: 'Register',
            slug: 'sign-up'
        },
        {
            value: 'Login',
            slug: 'login'
        }
    ];


    const handleRedirect = () => {
        navigate('/sell-product');
    }


    const logOutRedirect = () => {
        navigate('/login');
    }


    const handleVendorModal = () => {
        openModal({
            size: 'sm',
            content: <SwitchVendorModal redirect={handleRedirect}>
                <div className='flex'>
                    <p className='text-sm gap-2 leading-[1.7rem]'>
                        To start selling on Kudu, your account will be switched to a vendor account. This change unlocks all the features you need to list products, manage orders, and grow your business.
                    </p>
                </div>
            </SwitchVendorModal>
        });
        onSelected(false)
    }


    const handleLogOutModal = () => {
        openModal({
            size: "sm",
            content: <LogOutModal redirect={logOutRedirect} />
        })
    }

    return (
        <div className={`h-full bg-white rounded-md flex-col w-full lg:hidden md:hidden flex overflow-auto bg-mobiDarkCloud transition-all mb-10`}>
            {/* Logo */}
            <div className="py-2 px-4 flex gap-2 flex-col space-x-2 border-bottom">
                <div className='flex px-3 justify-center'>
                    <Link to={'/'}>
                        <Imgix
                            src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1737497178/kuduMart/kudum_2_c8qm7a.png"
                            sizes="20vw"
                            width={160}
                            height={33}
                        />
                    </Link>
                </div>
            </div>

            {/* Navigation Items */}
            <nav className="space-y-5">
                <nav className="text-left flex flex-col">
                    <Link
                        to="/"
                        className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200 flex items-center gap-3"
                        onClick={handleClose}
                    >
                        <Home size={20} style={{ color: "#ff6f22" }} />
                        Home
                    </Link>
                    <Link
                        to="/about"
                        className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200 flex items-center gap-3"
                        onClick={handleClose}

                    >
                        <Users size={20} style={{ color: "#ff6f22" }} />
                        About Us
                    </Link>
                    <Link
                        to="/testimonial"
                        className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200 flex items-center gap-3"
                        onClick={handleClose}

                    >
                        <MessageSquareQuote size={20} style={{ color: "#ff6f22" }} />
                        Testimonial
                    </Link>
                    <Link
                        to="/contact"
                        className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200 flex items-center gap-3"
                        onClick={handleClose}

                    >
                        <Mail size={20} style={{ color: "#ff6f22" }} />
                        Contact
                    </Link>
                    <Link
                        to="/career"
                        className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200 flex items-center gap-3"
                        onClick={handleClose}

                    >
                        <Hammer size={20} style={{ color: "#ff6f22" }} />
                        Careers
                    </Link>
                    <Link
                        to="/faqs"
                        className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200 flex items-center gap-3"
                        onClick={handleClose}

                    >
                        <HelpCircle size={20} style={{ color: "#ff6f22" }} />
                        FAQs
                    </Link>

                    {user && user.accountType !== 'Vendor' ?
                        <Link
                            to="/become-a-vendor"
                            className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200 flex items-center gap-3"
                            onClick={handleClose}

                        >
                            <Store size={20} style={{ color: "#ff6f22" }} />
                            Become a Vendor
                        </Link>
                        :
                        <></>
                    }

                    <Link
                        to="/advertise-with-us"
                        className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200 flex items-center gap-3"
                        onClick={handleClose}

                    >
                        <Megaphone size={20} style={{ color: "#ff6f22" }} />
                        Advertise with Us
                    </Link>

                    <Link
                        to="/privacy"
                        className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200 flex items-center gap-3"
                        onClick={handleClose}

                    >
                        <ShieldCheck size={20} style={{ color: "#ff6f22" }} />
                        Privacy Policy
                    </Link>

                    <Link
                        to="/terms-condition"
                        className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200 flex items-center gap-3"
                        onClick={handleClose}

                    >
                        <ScrollText size={20} style={{ color: "#ff6f22" }} />
                        Terms and Conditions
                    </Link>
                    {/* <Link
                        to="/auction"
                        className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200 flex items-center gap-3"
                        
                    >
                        <Hammer size={20} style={{ color: "#ff6f22" }} />
                        Auction
                    </Link> */}
                    {/* <Accordion open={open} className="">
                    <AccordionHeader onClick={() => handleOpen()}>
                
                    <Login size={20} style={{ color: "#ff6f22" }} />
                    <span className="mr-1 text-[13px] font-[500]"> Register/Login </span>
                    </AccordionHeader>
                    <AccordionBody>
                        <div className="space-y-2">
                            {authOptions.map((option, index) => (
                                <Link key={index} to={`/${option.slug}`} className="flex items-center py-2 px-6 rounded-lg" onClick={() => onSelected(false)}>
                                    <span className="text-center w-full text-sm font-[500]">{option.value}</span>
                                </Link>
                            ))}
                        </div>
                    </AccordionBody>
                </Accordion> */}
                    {/* <Link
                        to={"/auction"}
                        className="bg-kuduDarkGrey text-white py-2 px-4 rounded-md"
                    >
                        <span className="mr-1 text-sm font-[500]">Auction</span>
                    </Link> */}
                </nav>
                
                {/* Authentication Section for Non-Logged In Users */}
                {!user && (
                    <div className="px-4 py-4">
                        <div className="space-y-3">
                            <Link
                                to="/sign-up"
                                className="w-full bg-kuduOrange text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors"
                                onClick={handleClose}
                            >
                                <UserPlus size={20} />
                                <span className="text-sm font-medium">Sign Up</span>
                            </Link>
                            <Link
                                to="/login"
                                className="w-full border-2 border-kuduOrange text-kuduOrange py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-orange-50 transition-colors"
                                onClick={handleClose}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15M10 17L15 12M15 12L10 7M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span className="text-sm font-medium">Login</span>
                            </Link>
                        </div>
                    </div>
                )}

                {/* Profile Section for Logged In Users */}
                {user && (
                    <div className="px-4 py-4">
                        <div className="space-y-3">
                            <Link
                                to="/profile"
                                className="w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-lg flex items-center gap-3 hover:bg-gray-200 transition-colors"
                                onClick={handleClose}
                            >
                                <div className="w-8 h-8 bg-kuduOrange rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                    {user.firstName?.charAt(0) || 'U'}
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-medium text-gray-900">
                                        {user.firstName} {user.lastName}
                                    </p>
                                    <p className="text-xs text-gray-500">View Profile</p>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}

                {user &&
                    <span className="bg-kuduOrange text-white py-2 px-6 mx-4 flex items-center rounded-lg" onClick={() => handleVendorModal()}>
                        <span className="text-center w-full text-sm font-[500]">Sell on Kudu</span>
                    </span>
                }
                <div className='w-full h-[1px] px-4 border-mobiSilverDivider border-bottom border'></div>
            </nav>

            {/* Footer */}
            {user &&
                <div className="px-4 py-6">
                    <a to="#" onClick={() => handleLogOutModal()} className={`flex items-center py-2 px-4 h-[57px] rounded-lg text-red-500 hover:bg-kuduLightGray  transition`}>
                        <i className="fas fa-sign-out-alt mr-3"></i>
                        <span className="text-sm font-[500]">Logout</span>
                    </a>
                </div>
            }
        </div>
    );
}
