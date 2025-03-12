import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const MyComponent = ({ categories }) => {

    const navigate = useNavigate();

    const slides = [
        {
            desktopImage: "https://res.cloudinary.com/do2kojulq/image/upload/v1740387320/kmb4_fkdjo4.png",
            mobileImage: "https://res.cloudinary.com/do2kojulq/image/upload/v1741188644/kudu_mart/mbkd2_2_rjixyc.png",
        },
        {
            desktopImage: "https://res.cloudinary.com/do2kojulq/image/upload/v1740387322/kdbn3_ynznyh.jpg",
            mobileImage: "https://res.cloudinary.com/do2kojulq/image/upload/v1741188898/kudu_mart/mbkd2_v3y2ve.png",
        },
        {
            desktopImage: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1739274574/kuduMart/WhatsApp_Image_2025-02-11_at_11.18.18_AM_hcqyzy.jpg",
            mobileImage: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1739297530/kuduMart/mbkd3o_ulwuof.png",
        },
    ];



    const handleNavigation = (id, name) => {
        navigate(`products/categories/${id}/${name}`)
    }



    return (
        <div
            className="relative z-50 bg-white J md:mt-50 sm:mt-50"
            style={{
                backgroundImage: "url('https://res.cloudinary.com/greenmouse-tech/image/upload/v1741089169/We-Immersive/kmb4_1_mtofeu.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-30 md:px-20 md:mt-2 sm:mt-4 px-5 py-3 lg:gap-10 md:gap-8 gap-5 h-full">
                {/* Desktop View - Top Categories + Banner */}
                <div className="hidden md:flex items-stretch rounded-lg overflow-hidden">
                    {/* Left - Top Categories */}
                    <div className="w-1/5 bg-[#FF6F22] text-white flex flex-col">
                        <h3 className="text-white font-bold text-center text-[14px] uppercase py-5 bg-black">
                            Top Categories
                        </h3>
                        <ul
                            className={`flex flex-col max-h-[335px] custom-scrollbar overflow-y-auto py-3 px-4 gap-4`}>
                                {categories.map((category, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center text-[15px] font-medium gap-5 cursor-pointer"
                                        onClick={() => handleNavigation(category.id, category.name)}
                                    >
                                        <img
                                            src={category.img}
                                            alt={category.name}
                                            className="w-[18px] h-[18px] object-contain"
                                        />
                                        {category.name}
                                    </li>
                                ))}
                        </ul>
                    </div>

                    <div className="w-4/5">
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
