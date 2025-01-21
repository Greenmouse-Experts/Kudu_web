import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const MyComponent = () => {
    const slides = [
        {
            image: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1737480963/kuduMart/image_1_kmqhfw.jpg",
            heading: "Buy & Sell Everything in Conditions of Your Choice",
            placeholder: "Find anything on Kudu...",
        },
        {
            image: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1737480957/kuduMart/image2_1_y9dxb6.jpg",
            heading: "Discover Amazing Deals on Your Favorite Products",
            placeholder: "Search for great deals...",
        },
        {
            image: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1737480959/kuduMart/image1_1_nci5cl.jpg",
            heading: "Discover Amazing Deals on Your Favorite Products",
            placeholder: "Search for great deals...",
        },
    ];

    return (
        <div className="relative w-full z-50 bg-white py-4 lg:mt-10 md:mt-20 mt-10">
            {/* Swiper Slider */}
            <Swiper
                modules={[Autoplay]}
                // pagination={{ clickable: true }}
                // navigation
                autoplay={{ delay: 3000 }}
                loop={true}
                className="h-[70vh] md:h-[60vh] lg:h-[70vh]"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div
                            style={{
                                backgroundImage: `url(${slide.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                height: "70vh",
                            }}
                            className="w-full flex items-center justify-between px-6 lg:px-20 md:px-1"
                        >
                            {/* Left Content */}
                            <div className="w-full absolute inset-0 grid grid-cols-1 md:grid-cols-2 items-center gap-6 px-6 xl:px-20">
                                {/* Left Content */}
                                <div className="flex flex-col gap-4 md:text-left z-0 w-full max-w-6xl lg:pl-20 md:pl-1 md:mt-[50px]">
                                    <p className="text-2xl text-white sm:text-lg md:text-4xl xl:text-5xl Fonttin font-bold">
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
                                            <button className="bg-kuduOrange text-white text-sm sm:text-base px-8 py-5 sm:py-3 md:py-4 rounded-md transition duration-300 hover:bg-opacity-90">
                                                Search
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default MyComponent;
