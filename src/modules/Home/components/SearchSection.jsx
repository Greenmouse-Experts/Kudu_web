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
            desktopImage: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1739274574/kuduMart/WhatsApp_Image_2025-02-11_at_10.53.04_AM_pfjm1l.jpg",
            mobileImage: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1739297531/kuduMart/mbkd2a_w6rfwd.png",
            heading: "Buy, Sell & Auction Anything! Easily and Securely",
            placeholder: "Find anything on Kudu...",
        },
        {
            desktopImage: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1739274574/kuduMart/WhatsApp_Image_2025-02-11_at_11.18.19_AM_yyeduw.jpg",
            mobileImage: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1739297530/kuduMart/mbkd2_t9gbgi.png",
            heading: "Sell off your Items To The Highest bidder by Auctioning Here!",
            placeholder: "Search for great deals...",
        },
        {
            desktopImage: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1739274574/kuduMart/WhatsApp_Image_2025-02-11_at_11.18.18_AM_hcqyzy.jpg",
            mobileImage: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1739297530/kuduMart/mbkd3o_ulwuof.png",
            heading: "Looking to Sell Something ? KUDU is the right place for you!",
            placeholder: "Search for great deals...",
        },
        {
            desktopImage: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1739274574/kuduMart/WhatsApp_Image_2025-02-11_at_10.53.05_AM_gs0hcc.jpg",
            mobileImage: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1739297530/kuduMart/mbkd4_ipvaxv.png",
            heading: "Looking to Sell Something ? KUDU is the right place for you!",
            placeholder: "Search for great deals...",
        },
    ];

    return (
        <div className="relative w-full z-50 bg-white py-4 md:mt-1 sm:mt-50">
            {/* Swiper Slider */}
            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3000 }}
                loop={true}
                className="h-[70vh] md:h-[70vh] sm:h-[70vh] lg:h-[70vh] xl:h-[70vh]"
                
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div
                            style={{
                                backgroundImage: `url(${slide.desktopImage})`,
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                height: "75vh",
                                width:" 100%",
                                backgroundRepeat:"no-repeat",
                            }}
                            className="hidden md:block w-full bg-cover bg-center bg-no-repeat h-[70vh] items-center justify-between px-6 lg:px-20"
                        >
                            {/* Content */}
                        </div>
                        <div
                            style={{
                                backgroundImage: `url(${slide.mobileImage})`,
                                backgroundSize: "contain",
                                backgroundPosition: "center",
                                height: "80vh",
                                backgroundRepeat:"no-repeat",
                                 width:" 100%",
                            }}
                            className="block md:hidden w-full bg-cover bg-center bg-no-repeat h-[60vh] items-center justify-between px-6"
                        >
                            {/* Content */}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MyComponent;

