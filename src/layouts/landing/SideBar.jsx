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

                    <Link
                        to="/become-a-vendor"
                        className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200 flex items-center gap-3"
                        onClick={handleClose}

                    >
                        <Store size={20} style={{ color: "#ff6f22" }} />
                        Become a Vendor
                    </Link>

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

                    {!user &&
                        <Link
                            to="/login"
                            className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200 flex items-center gap-3"
                            onClick={handleClose}

                        >
                            <UserPlus size={20} style={{ color: "#ff6f22" }} />
                            Register / Login
                        </Link>
                    }

                    {user &&
                        <Link
                            to="/profile"
                            onClick={handleClose}
                            className="px-6 py-4 text-base text-black cursor-pointer hover:bg-gray-200 flex items-center gap-3"
                        >
                            <svg
                                width="15"
                                height="15"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M21.6488 19.875C20.2209 17.4066 18.0206 15.6366 15.4528 14.7975C16.723 14.0414 17.7098 12.8892 18.2618 11.5179C18.8137 10.1467 18.9003 8.63213 18.5082 7.2069C18.1161 5.78167 17.267 4.52456 16.0912 3.62862C14.9155 2.73268 13.4782 2.24745 12 2.24745C10.5218 2.24745 9.08451 2.73268 7.90878 3.62862C6.73306 4.52456 5.88394 5.78167 5.49183 7.2069C5.09971 8.63213 5.18629 10.1467 5.73825 11.5179C6.29021 12.8892 7.27704 14.0414 8.5472 14.7975C5.97938 15.6356 3.77907 17.4056 2.35126 19.875C2.2989 19.9604 2.26417 20.0554 2.24912 20.1544C2.23407 20.2534 2.239 20.3544 2.26363 20.4515C2.28825 20.5486 2.33207 20.6398 2.3925 20.7196C2.45293 20.7995 2.52874 20.8665 2.61547 20.9165C2.7022 20.9666 2.79808 20.9989 2.89745 21.0113C2.99683 21.0237 3.0977 21.0161 3.19409 20.989C3.29049 20.9618 3.38047 20.9156 3.45872 20.8531C3.53697 20.7906 3.6019 20.713 3.6497 20.625C5.41595 17.5725 8.53782 15.75 12 15.75C15.4622 15.75 18.5841 17.5725 20.3503 20.625C20.3981 20.713 20.4631 20.7906 20.5413 20.8531C20.6196 20.9156 20.7095 20.9618 20.8059 20.989C20.9023 21.0161 21.0032 21.0237 21.1026 21.0113C21.2019 20.9989 21.2978 20.9666 21.3845 20.9165C21.4713 20.8665 21.5471 20.7995 21.6075 20.7196C21.6679 20.6398 21.7118 20.5486 21.7364 20.4515C21.761 20.3544 21.766 20.2534 21.7509 20.1544C21.7358 20.0554 21.7011 19.9604 21.6488 19.875ZM6.75001 9C6.75001 7.96165 7.05792 6.94662 7.63479 6.08326C8.21167 5.2199 9.03161 4.54699 9.99092 4.14963C10.9502 3.75227 12.0058 3.64831 13.0242 3.85088C14.0426 4.05345 14.9781 4.55347 15.7123 5.28769C16.4465 6.02192 16.9466 6.95738 17.1491 7.97578C17.3517 8.99418 17.2477 10.0498 16.8504 11.0091C16.453 11.9684 15.7801 12.7883 14.9168 13.3652C14.0534 13.9421 13.0384 14.25 12 14.25C10.6081 14.2485 9.27359 13.6949 8.28934 12.7107C7.3051 11.7264 6.7515 10.3919 6.75001 9Z"
                                    fill="rgba(255, 111, 34, 1)"
                                />
                            </svg>
                            <span className="mr-1 text-[15px] font-[500] mt-[4px]">
                                {" "}
                                {user.firstName}{" "}
                            </span>
                        </Link>
                    }
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
                {/* {user &&
                    <>
                        <Link to="/cart" className="flex items-center py-2 px-4 text-black gap-1" onClick={() => onSelected(false)}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.75 11.25V16.5C12.75 16.6989 12.671 16.8897 12.5304 17.0303C12.3897 17.171 12.199 17.25 12 17.25C11.8011 17.25 11.6104 17.171 11.4697 17.0303C11.3291 16.8897 11.25 16.6989 11.25 16.5V11.25C11.25 11.0511 11.3291 10.8603 11.4697 10.7197C11.6104 10.579 11.8011 10.5 12 10.5C12.199 10.5 12.3897 10.579 12.5304 10.7197C12.671 10.8603 12.75 11.0511 12.75 11.25ZM16.2038 11.175L15.6788 16.425C15.6684 16.5233 15.6776 16.6227 15.7057 16.7174C15.7339 16.8122 15.7805 16.9004 15.8429 16.9771C15.9053 17.0537 15.9822 17.1173 16.0692 17.1642C16.1563 17.211 16.2517 17.2402 16.35 17.25C16.3753 17.2514 16.4007 17.2514 16.426 17.25C16.6118 17.2498 16.7908 17.1806 16.9285 17.0559C17.0662 16.9312 17.1527 16.7598 17.1713 16.575L17.6963 11.325C17.7162 11.1271 17.6566 10.9294 17.5308 10.7754C17.4049 10.6213 17.223 10.5236 17.025 10.5037C16.8271 10.4839 16.6294 10.5434 16.4754 10.6693C16.3214 10.7952 16.2237 10.9771 16.2038 11.175ZM7.7963 11.175C7.77641 10.9771 7.67871 10.7952 7.52469 10.6693C7.37068 10.5434 7.17297 10.4839 6.97505 10.5037C6.77713 10.5236 6.59522 10.6213 6.46934 10.7754C6.34345 10.9294 6.28391 11.1271 6.3038 11.325L6.8288 16.575C6.84746 16.7606 6.93464 16.9327 7.07332 17.0575C7.212 17.1823 7.39222 17.2509 7.5788 17.25C7.60409 17.2514 7.62944 17.2514 7.65474 17.25C7.75274 17.2402 7.84784 17.2111 7.93461 17.1645C8.02138 17.1179 8.09812 17.0547 8.16045 16.9784C8.22278 16.9021 8.26948 16.8143 8.29789 16.72C8.32629 16.6257 8.33584 16.5267 8.32599 16.4287L7.7963 11.175ZM22.4935 8.34937L21.0807 18.9487C21.0314 19.3085 20.8538 19.6383 20.5805 19.8774C20.3073 20.1165 19.9569 20.2488 19.5938 20.25H4.4063C4.04322 20.2488 3.69278 20.1165 3.41955 19.8774C3.14632 19.6383 2.96871 19.3085 2.91943 18.9487L1.50661 8.34937C1.49245 8.24343 1.5011 8.13568 1.53197 8.03334C1.56285 7.93101 1.61525 7.83646 1.68564 7.75603C1.75604 7.6756 1.84282 7.61115 1.94016 7.56699C2.03751 7.52283 2.14316 7.49999 2.25005 7.5H6.40974L11.4375 1.75594C11.5079 1.67613 11.5945 1.61222 11.6915 1.56844C11.7885 1.52466 11.8936 1.50201 12 1.50201C12.1065 1.50201 12.2116 1.52466 12.3086 1.56844C12.4056 1.61222 12.4922 1.67613 12.5625 1.75594L17.5904 7.5H21.75C21.8569 7.49999 21.9626 7.52283 22.0599 7.56699C22.1573 7.61115 22.2441 7.6756 22.3145 7.75603C22.3849 7.83646 22.4372 7.93101 22.4681 8.03334C22.499 8.13568 22.5076 8.24343 22.4935 8.34937ZM8.40286 7.5H15.5972L12 3.38906L8.40286 7.5ZM20.8932 9H3.10693L4.4063 18.75H19.5938L20.8932 9Z" fill="black" />
                            </svg>
                            <span className="mr-1 text-[13px] font-[500]">Cart</span>
                        </Link>
                        <Link to="/messages" className="flex items-center py-2 px-4 text-black gap-1" onClick={() => onSelected(false)}>
                            <svg width="14" height="14" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.87503 8C8.87503 7.7775 8.94101 7.55999 9.06462 7.37498C9.18824 7.18998 9.36394 7.04578 9.56951 6.96064C9.77507 6.87549 10.0013 6.85321 10.2195 6.89662C10.4377 6.94003 10.6382 7.04717 10.7955 7.20451C10.9529 7.36184 11.06 7.56229 11.1034 7.78052C11.1468 7.99875 11.1245 8.22495 11.0394 8.43052C10.9542 8.63609 10.81 8.81179 10.625 8.9354C10.44 9.05902 10.2225 9.125 10 9.125C9.70166 9.125 9.41551 9.00647 9.20453 8.7955C8.99355 8.58452 8.87503 8.29837 8.87503 8ZM5.87503 9.125C6.09753 9.125 6.31504 9.05902 6.50004 8.9354C6.68505 8.81179 6.82924 8.63609 6.91439 8.43052C6.99954 8.22495 7.02182 7.99875 6.97841 7.78052C6.935 7.56229 6.82786 7.36184 6.67052 7.20451C6.51319 7.04717 6.31273 6.94003 6.0945 6.89662C5.87627 6.85321 5.65007 6.87549 5.44451 6.96064C5.23894 7.04578 5.06324 7.18998 4.93962 7.37498C4.81601 7.55999 4.75003 7.7775 4.75003 8C4.75003 8.29837 4.86855 8.58452 5.07953 8.7955C5.29051 9.00647 5.57666 9.125 5.87503 9.125ZM14.125 9.125C14.3475 9.125 14.565 9.05902 14.75 8.9354C14.935 8.81179 15.0792 8.63609 15.1644 8.43052C15.2495 8.22495 15.2718 7.99875 15.2284 7.78052C15.185 7.56229 15.0779 7.36184 14.9205 7.20451C14.7632 7.04717 14.5627 6.94003 14.3445 6.89662C14.1263 6.85321 13.9001 6.87549 13.6945 6.96064C13.4889 7.04578 13.3132 7.18998 13.1896 7.37498C13.066 7.55999 13 7.7775 13 8C13 8.29837 13.1186 8.58452 13.3295 8.7955C13.5405 9.00647 13.8267 9.125 14.125 9.125ZM19.75 2V14C19.75 14.3978 19.592 14.7794 19.3107 15.0607C19.0294 15.342 18.6479 15.5 18.25 15.5H5.78128L2.72503 18.14L2.71659 18.1466C2.44662 18.3755 2.10397 18.5008 1.75003 18.5C1.52968 18.4995 1.31211 18.4509 1.11253 18.3575C0.853652 18.2379 0.634676 18.0462 0.481739 17.8055C0.328802 17.5648 0.248363 17.2852 0.250025 17V2C0.250025 1.60218 0.40806 1.22064 0.689365 0.93934C0.97067 0.658035 1.3522 0.5 1.75003 0.5H18.25C18.6479 0.5 19.0294 0.658035 19.3107 0.93934C19.592 1.22064 19.75 1.60218 19.75 2ZM18.25 2H1.75003V17L5.00971 14.1875C5.14523 14.068 5.31934 14.0014 5.50003 14H18.25V2Z" fill="black" />
                            </svg>
                            <span className="mr-1 text-[13px] font-[500]">Messages</span>
                        </Link>
                        <a to="#" className="flex items-center py-2 px-4 text-black gap-1" onClick={() => onSelected(false)}>
                            <svg width="14" height="14" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.25 0H1.75C1.35218 0 0.970644 0.158035 0.68934 0.43934C0.408035 0.720644 0.25 1.10218 0.25 1.5V18C0.250067 18.1338 0.285951 18.2652 0.353929 18.3805C0.421907 18.4958 0.519503 18.5908 0.636587 18.6557C0.753672 18.7206 0.885979 18.7529 1.01978 18.7494C1.15358 18.7458 1.284 18.7066 1.3975 18.6356L7 15.1341L12.6034 18.6356C12.7169 18.7063 12.8472 18.7454 12.9809 18.7488C13.1146 18.7522 13.2467 18.7198 13.3636 18.655C13.4806 18.5902 13.5781 18.4953 13.646 18.3801C13.7139 18.2649 13.7498 18.1337 13.75 18V1.5C13.75 1.10218 13.592 0.720644 13.3107 0.43934C13.0294 0.158035 12.6478 0 12.25 0ZM12.25 16.6472L7.39656 13.6144C7.27736 13.5399 7.13963 13.5004 6.99906 13.5004C6.8585 13.5004 6.72076 13.5399 6.60156 13.6144L1.75 16.6472V1.5H12.25V16.6472Z" fill="black" />
                            </svg>
                            <span className="mr-1 text-[13px] font-[500]">Saved Items</span>
                        </a>
                    </>
                } */}
                {user &&
                    <span className="bg-kuduOrange text-white py-2 px-6 flex items-center rounded-lg" onClick={() => handleVendorModal()}>
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
