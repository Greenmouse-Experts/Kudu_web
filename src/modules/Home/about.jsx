import { useState } from "react";
import "../Home/components/style.css";
import ShoppingExperience from "./components/ShoppingExperience";

export default function About() {
    const [activeTab, setActiveTab] = useState("sell");

    const tabs = [
        { id: "sell", label: "How to sell on Kudu" },
        { id: "buy", label: "How to buy on Kudu" },
        { id: "auction", label: "How to join an auction on Kudu" },
    ];

    const content = {
        sell: [
            {
                title: "1. Create an Account",
                description:
                    "Register using your name, email, and phone number or via your Google account and verify your account with your email.",
                last:
                    "Complete your seller profile, including location and payment details.",
                icon: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1738150277/Group_1321314956_bqoeeg.png",
            },
            {
                title: "2. List your product",
                description:
                    "Navigate to the 'Sell on Kudu' section. ",
                last:
                    "Provide product details, price, and upload high-quality photos of the product.",
                end:
                    "You will be notified once published after a review process.",
                icon: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1738152542/Group_1321314958_orslsy.png",
            },
            {
                title: "3. Connect with Buyers",
                description:
                    "Buyers will contact you directly. Answer queries, negotiate terms, and finalize deals.",
                last:
                    "Monitor notifications and ensure smooth communication.",
                icon: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1738152542/Group_1321314959_nach9t.png",
            },
            {
                title: "4. Fulfill Orders",
                description:
                    "For sales done directly or from the platform, confirm that you’ve received payment before shipping.",
                last:
                    "Ship the product using the buyer’s shipping details and provide a tracking number",
                icon: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1738152543/Group_1321314960_mmhiru.png",

            },
        ],
        buy: [
            {
                title: "Search for Products",
                description:
                    "Browse or search for products using filters to find the best deals.",
                icon: "/icons/search.png",
            },
            {
                title: "Add to Cart & Checkout",
                description:
                    "Select items, add them to your cart, and proceed to secure checkout.",
                icon: "/icons/cart.png",
            },
            {
                title: "Make Payment",
                description:
                    "Choose a payment method, complete the transaction, and get confirmation.",
                icon: "/icons/payment.png",
            },
            {
                title: "Receive Your Order",
                description:
                    "Track your order and receive it at your specified location.",
                icon: "/icons/delivery.png",
            },
        ],
        auction: [
            {
                title: "Register for Auctions",
                description:
                    "Sign up for an auction and understand bidding rules before participating.",
                icon: "/icons/register.png",
            },
            {
                title: "Place Your Bids",
                description:
                    "Monitor auction listings, bid competitively, and stay updated on bid status.",
                icon: "/icons/bidding.png",
            },
            {
                title: "Win & Checkout",
                description:
                    "If you win, proceed to checkout, make payment, and confirm order details.",
                icon: "/icons/winner.png",
            },
            {
                title: "Receive Auction Item",
                description:
                    "After payment, track shipping details and get your item delivered.",
                icon: "/icons/delivery.png",
            },
        ],
    };
    return (
        <>
            <div className="w-full flex flex-col">
                <section className="breadcrumb" style={{
                    backgroundImage: `url(https://res.cloudinary.com/greenmouse-tech/image/upload/v1738015034/image_5_vbukr9.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}>
                    <div className="flex flex-col py-12">
                        <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 h-full">
                            <h1 className="text-4xl font-bold">About KUDU</h1>
                        </div>
                    </div>
                </section>
            </div>
            <div className="w-full flex flex-col bg-white items-center">
                {/* Hero Section */}
                <section className="w-full Ju mt-16">
                    <div className="container mx-auto flex flex-col md:flex-row xl:px-20 lg:px-20 md:px-2 sm:px-1 gap-8">
                        <div className="flex-[2] md:text-left">
                            <h1 className="text-4xl font-medium text-black leading-snug mb-4">
                                Welcome to Kudu Mart, your ultimate destination for secure and seamless online shopping
                            </h1>
                            <p className="text-black text-lg mb-6 leading-loose">
                                We are an innovative online marketplace connecting individuals and businesses worldwide.
                                Whether you're looking to buy quality products, sell stuff online, or participate in live online auctions,
                                Kudu Mart provides a reliable platform built on trust and reliability.
                            </p>
                            <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-600">
                                Visit Store
                            </button>
                        </div>
                        <div className="flex-[1] rounded-lg">
                            <img src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1738147549/Group_1321314967_dopyks.png" className="Justtt" draggable="false" alt="" />
                        </div>
                    </div>

                </section>

                {/* Core Principles Section */}
                <section className="w-full bg-white py-16">
                    <div className="container mx-auto px-6 lg:px-20 text-left">
                        <h2 className="text-3xl font-medium text-black text-center leading-relaxed mb-12">
                            At KUDU, we prioritize trust, safety, and customer <br></br> satisfaction. Here are Our Core Principles
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            {[
                                {
                                    title: "Fairness",
                                    description:
                                        "We ensure equal opportunities for sellers and fair pricing for buyers, promoting a level playing field.",
                                    icon: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1738148097/balance_inrqke.png"
                                },
                                {
                                    title: "Quality Assurance",
                                    description:
                                        "We verify seller authenticity, product legitimacy, and ensure compliance with industry standards.",
                                    icon: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1738149230/quality_ife3ka.png",
                                },
                                {
                                    title: "Transparency",
                                    description:
                                        "We provide clear policies, accurate product descriptions, and timely communication.",
                                    icon: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1738149230/transparency_xe8quv.png",
                                },
                                {
                                    title: "Customer Protection",
                                    description:
                                        "We prioritize safeguarding user information, ensuring secure transactions, and protecting customers.",
                                    icon: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1738149230/reliability_cfdjx2.png",
                                },
                                {
                                    title: "Accountability",
                                    description:
                                        "We take responsibility for resolving disputes and continually improving our platform.",
                                    icon: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1738148097/balance_inrqke.png",
                                },
                            ].map((principle, index) => (
                                <div
                                    key={index}
                                    className="bg-white p-8 gap-4 rounded-lg border hover:shadow-xl transition-shadow"
                                >
                                    <img
                                        src={principle.icon}
                                        alt={principle.title}
                                        className="w-16 h-16 inline-block mx-auto mb-6 !important"
                                    />
                                    <h3 className="text-lg font-semibold text-black mb-2">
                                        {principle.title}
                                    </h3>
                                    <p className="text-base text-black leading-loose">{principle.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="w-full Ju mt-12">
                    <div className="container mx-auto md:flex-row px-6 lg:px-20 gap-8">
                        <h2 className="text-3xl font-medium leading-relaxed text-center mb-12">
                            We make internet purchasing simple, <br></br> dependable, and fulfilling.
                        </h2>

                        <div className="flex justify-center lg:space-x-12 sm:space-x-8 space-x-4 mb-12">
                            {tabs.map((tab, index) => (
                                <div key={tab.id} className="flex items-center space-x-4">
                                    <button
                                        className={`px-8 py-5 rounded-lg font-medium transition-all ${activeTab === tab.id
                                            ? "bg-[#FF6F22] text-white shadow-lg"
                                            : "bg-gray-200 text-gray-600"
                                            }`}
                                        onClick={() => setActiveTab(tab.id)}
                                    >
                                        {tab.label}
                                    </button>

                                    {/* Image between tabs, except after the last tab */}
                                    {index < tabs.length - 1 && (
                                        <img
                                            src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1738178221/Line_3_tq4kun.png"
                                            alt="separator"
                                            className="h-12 w-44 object-contain"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        <p className="mb-10 text-base">
                            A little guide on how to sell your product her on Kudu
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:text-center sm:text-left rounded-full">
                            {content[activeTab].map((step, index) => (
                                <div key={index} className="p-10 sm:p-6 md:p-8 flex flex-col Abinahh cursor-pointer">
                                    <img
                                        src={step.icon}
                                        alt={step.title}
                                        className="w-32 h-32 sm:w-24 sm:h-24 md:w-28 md:h-28 block mx-auto mb-8"
                                    />
                                    <h3 className="text-lg font-semibold">{step.title}</h3>
                                    <li className="text-black text-base mt-2 leading-loose">{step.description}</li>
                                    <p className="text-black text-base mt-2 leading-loose">{step.last}</p>
                                    <p className="text-black text-base mt-2 leading-loose">{step.end}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-6 lg:px-20 text-left Juppp">
                    <div className="relative w-full mx-auto">
                        {/* Background Image */}
                        <div className="relative h-72 md:h-96 w-full rounded-2xl overflow-hidden">
                            <img
                                src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1738178739/image_umfj5s.jpg"
                                alt="Shopping Bags"
                                className="absolute w-full h-full object-cover"
                            />
                        </div>

                        {/* Text & Button Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                            <h2 className="text-white text-lg md:text-3xl font-semibold leading-loose">
                                Join the thousands of happy customers who rely on <br />
                                <span className="font-bold leading-loose">Kudu Mart</span> for their online shopping needs.
                            </h2>
                            <button className="mt-7 bg-[#FF6F22] text-white text-sm px-8 py-3 rounded-md">
                                Start Shopping
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 bg-white h-full">
                    <div className="w-full flex mt-3">
                        <ShoppingExperience />
                    </div>
                </div>
            </div>
        </>
    );
}
