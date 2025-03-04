import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import {
    ShoppingBag,
    Smartphone,
    Heart,
    Monitor,
    Baby,
    Cpu,
    Gamepad2,
    Piano,
    MoreHorizontal,
} from "lucide-react";

const MyComponent = () => {
    const slides = [
        {
            desktopImage: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1741089198/We-Immersive/kmb4_1_yuefm2.jpg",
            mobileImage: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1739297531/kuduMart/mbkd2a_w6rfwd.png",
        },
        {
            desktopImage: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1741089198/We-Immersive/kmb4_1_yuefm2.jpg",
            mobileImage: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1739297530/kuduMart/mbkd2_t9gbgi.png",
        },
        {
            desktopImage: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1741089198/We-Immersive/kmb4_1_yuefm2.jpg",
            mobileImage: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1739297530/kuduMart/mbkd3o_ulwuof.png",
        },
    ];

    const categories = [
        { icon: ShoppingBag, name: "Appliances" },
        { icon: Smartphone, name: "Phones & tablet" },
        { icon: Heart, name: "Health & beauty" },
        { icon: Monitor, name: "Electronics" },
        { icon: Baby, name: "Baby products" },
        { icon: Cpu, name: "Computing" },
        { icon: Gamepad2, name: "Gaming" },
        { icon: Piano, name: "Musical instrument" },
        { icon: MoreHorizontal, name: "Other categories" },
    ];

    return (
        <div
        className="relative z-50 bg-white J md:mt-50 sm:mt-50"
        style={{
            backgroundImage: "url('https://res.cloudinary.com/greenmouse-tech/image/upload/v1741089169/We-Immersive/kmb4_1_mtofeu.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}
    >
        <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-30 md:px-20 md:mt-2 mt-4 px-5 py-3 lg:gap-10 md:gap-8 gap-5 h-full">
            {/* Desktop View - Top Categories + Banner */}
            <div className="hidden md:flex items-stretch rounded-lg overflow-hidden">
                {/* Left - Top Categories */}
                <div className="w-1/4 bg-[#FF6F22] text-white flex flex-col">
                    <h3 className="text-white font-bold text-center text-[14px] uppercase mb-3 py-5 bg-black">
                        Top Categories
                    </h3>
                    <ul className="flex flex-col gap-3 p-4">
                        {categories.map((category, index) => (
                            <li
                                key={index}
                                className="flex items-center text-[14px] font-medium gap-5 cursor-pointer"
                            >
                                <category.icon size={18} />
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </div>
    
                <div className="w-3/4">
                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{ delay: 3000 }}
                        loop={true}
                        className="w-full h-[400px]" 
                    >
                        {slides.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={slide.desktopImage}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
    
            {/* Mobile View - Swiper */}
            <div className="block md:hidden">
                <Swiper
                    modules={[Autoplay]}
                    autoplay={{ delay: 3000 }}
                    loop={true}
                    className="h-[350px] mt-8"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div
                                style={{
                                    backgroundImage: `url(${slide.mobileImage})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                                className="w-full h-full rounded-lg"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    </div>
    
    );
};

export default MyComponent;
