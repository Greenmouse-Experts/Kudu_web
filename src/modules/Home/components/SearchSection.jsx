import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

const MyComponent = () => {
    const slides = [
        {
            image: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1739274574/kuduMart/WhatsApp_Image_2025-02-11_at_10.53.04_AM_pfjm1l.jpg",
            heading: "Buy, Sell & Auction Anything! Easily and Securely",
            placeholder: "Find anything on Kudu...",
        },
        {
            image: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1739274574/kuduMart/WhatsApp_Image_2025-02-11_at_11.18.19_AM_yyeduw.jpg",
            heading: "Sell off your Items To The Highest bidder by Auctioning Here!",
            placeholder: "Search for great deals...",
        },
        {
            image: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1739274574/kuduMart/WhatsApp_Image_2025-02-11_at_11.18.18_AM_hcqyzy.jpg",
            heading: "Looking to Sell Something ? KUDU is the right place for you!",
            placeholder: "Search for great deals...",
        },
        {
            image: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1739274574/kuduMart/WhatsApp_Image_2025-02-11_at_10.53.05_AM_gs0hcc.jpg",
            heading: "Looking to Sell Something ? KUDU is the right place for you!",
            placeholder: "Search for great deals...",
        },
    ];
    return (
        <div className="relative w-full z-50 bg-white py-4 md:mt-0 sm:mt-0">
            {/* Swiper Slider */}
            <Swiper
                modules={[Autoplay]}
                // pagination={{ clickable: true }}
                // navigation
                autoplay={{ delay: 3000 }}
                loop={true}
                className="h-[70vh] md:h-[70vh] sm:h-[60vh] lg:h-[70vh] xl:h-[70vh]"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div
                            style={{
                                backgroundImage: `url(${slide.image})`,
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                height: "70vh",
                                backgroundRepeat:"no-repeat",
                            }}
                            className="w-full flex items-center justify-between px-6 lg:px-20 md:px-1"
                        >
                            {/* Left Content */}
                            <div className="w-full absolute inset-0 grid grid-cols-1 md:grid-cols-2 items-center gap-6 px-6 lg:px-20">
                                {/* Left Content */}
                                {/* <div className="flex flex-col gap-4 md:text-left z-0 w-full max-w-7xl xl:ml-14 lg:pl-1 md:pl-1 md:mt-[0px]">
                                    <p className="text-2xl text-white sm:text-4xl md:text-4xl xl:text-5xl font-bold Fonttin">
                                        {slide.heading}
                                    </p>

                                    <div className="flex w-full flex-col gap-4">
                                        <div className="flex items-center bg-transparent rounded-lg overflow-hidden shadow-lg">
                                            <input
                                                type="text"
                                                className="w-full px-4 py-5 sm:px-4 sm:py-3 md:px-6 md:py-5 text-sm sm:text-base md:text-lg text-gray-700 outline-none"
                                                placeholder={slide.placeholder}
                                            />
                                        </div>
                                        <div className="flex sm:justify-start">
                                            <button className="bg-kuduOrange text-white text-sm sm:text-base px-10 py-5 sm:py-3 md:py-4 rounded-md transition duration-300 hover:bg-opacity-90">
                                            <Link
                                        to="/sign-up">Shop Now</Link>
                                            </button>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MyComponent;
