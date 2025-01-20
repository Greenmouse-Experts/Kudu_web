import { Carousel, IconButton } from "@material-tailwind/react";
import Imgix from "react-imgix";

export default function CategoriesSection() {
    const categoriesArr = [
        { name: "Trending", color: "bg-kuduStrayBlue", img: "https://res.cloudinary.com/do2kojulq/image/upload/v1735481488/kudu_mart/trending_fire_ivir2f.png", active: true },
        { name: "Vehicles", color: "bg-kuduPink", img: "https://res.cloudinary.com/do2kojulq/image/upload/v1735481489/kudu_mart/car_wosdu8.png", active: false },
        { name: "Property", color: "bg-kuduOrangeLight", img: "https://res.cloudinary.com/do2kojulq/image/upload/v1735481489/kudu_mart/house_gcwp8t.png", active: false },
        { name: "Sports", color: "bg-kuduLightGreen", img: "https://res.cloudinary.com/do2kojulq/image/upload/c_fill,w_360,h_360,g_auto/v1735481489/kudu_mart/sports_konvsu.png", active: false },
        { name: "Devices", color: "bg-kuduPurple", img: "https://res.cloudinary.com/do2kojulq/image/upload/v1735481488/kudu_mart/phone_mahapu.png", active: false },
        { name: "Property", color: "bg-kuduOrangeLight", img: "https://res.cloudinary.com/do2kojulq/image/upload/v1735481489/kudu_mart/house_gcwp8t.png", active: false },
        { name: "Sports", color: "bg-kuduLightGreen", img: "https://res.cloudinary.com/do2kojulq/image/upload/c_fill,w_360,h_360,g_auto/v1735481489/kudu_mart/sports_konvsu.png", active: false },
        { name: "Devices", color: "bg-kuduPurple", img: "https://res.cloudinary.com/do2kojulq/image/upload/v1735481488/kudu_mart/phone_mahapu.png", active: false },
        { name: "Beauty", color: "bg-kuduStrayBlue", img: "https://res.cloudinary.com/do2kojulq/image/upload/v1735481489/kudu_mart/beauty_wt1imb.png", active: false },
        { name: "Trending", color: "bg-kuduStrayBlue", img: "https://res.cloudinary.com/do2kojulq/image/upload/v1735481488/kudu_mart/trending_fire_ivir2f.png", active: true },
        { name: "Vehicles", color: "bg-kuduPink", img: "https://res.cloudinary.com/do2kojulq/image/upload/v1735481489/kudu_mart/car_wosdu8.png", active: false },
        { name: "Property", color: "bg-kuduOrangeLight", img: "https://res.cloudinary.com/do2kojulq/image/upload/v1735481489/kudu_mart/house_gcwp8t.png", active: false },
        { name: "Sports", color: "bg-kuduLightGreen", img: "https://res.cloudinary.com/do2kojulq/image/upload/c_fill,w_360,h_360,g_auto/v1735481489/kudu_mart/sports_konvsu.png", active: false },
        { name: "Devices", color: "bg-kuduPurple", img: "https://res.cloudinary.com/do2kojulq/image/upload/v1735481488/kudu_mart/phone_mahapu.png", active: false },
        { name: "Property", color: "bg-kuduOrangeLight", img: "https://res.cloudinary.com/do2kojulq/image/upload/v1735481489/kudu_mart/house_gcwp8t.png", active: false },
        { name: "Sports", color: "bg-kuduLightGreen", img: "https://res.cloudinary.com/do2kojulq/image/upload/c_fill,w_360,h_360,g_auto/v1735481489/kudu_mart/sports_konvsu.png", active: false },
        { name: "Devices", color: "bg-kuduPurple", img: "https://res.cloudinary.com/do2kojulq/image/upload/v1735481488/kudu_mart/phone_mahapu.png", active: false },
    ];

    const chunkArray = (arr, size) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    };

    const slidesXS = chunkArray(categoriesArr, 3); // Smaller chunk for mobile
    const slides = chunkArray(categoriesArr, 6); // Larger chunk for larger screens

    return (
        <div className="flex w-full flex-col gap-5">
            {/* Heading Section */}
            <div className="flex w-full items-center justify-between">
                <h1 className="text-black sm:text-lg md:text-2xl xl:text-3xl font-bold">Explore Popular Categories</h1>
                <p className="sm:text-lg md:text-1xl  text-kuduOrange font-semibold cursor-pointer underline">
                    View all Categories
                </p>
            </div>

            {/* Carousel Section */}
            <div className="w-full mx-auto">
                {/* Desktop Carousel */}
                <Carousel
                    className="rounded-lg md:flex hidden"
                    prevArrow={({ handlePrev }) => (
                        <IconButton
                            variant="text"
                            color="black"
                            size="md"
                            onClick={handlePrev}
                            className="!absolute top-2/4 left-4 -translate-y-2/4 bg-black text-white shadow-md rounded-full 
                       hover:bg-black !focus:bg-black active:bg-black !disabled:bg-black"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="3"
                                className="-ml-1 h-5 w-5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </IconButton>
                    )}
                    nextArrow={({ handleNext }) => (
                        <IconButton
                            variant="text"
                            color="black"
                            size="md"
                            onClick={handleNext}
                            className="!absolute top-2/4 right-4 -translate-y-2/4 bg-black text-white shadow-md rounded-full 
                       hover:bg-black !focus:bg-black active:bg-black !disabled:bg-black"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="3"
                                className="ml-1 h-5 w-5"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </IconButton>
                    )}
                >
                    {slides.map((slide, slideIndex) => (
                        <div className="flex gap-10 mt-10 py-2 justify-center" key={`slide-${slideIndex}`}>
                            {slide.map((category, index) => (
                                <div
                                    key={`slide-desktop-${index}`}
                                    className="w-[140px] flex flex-col items-center gap-4"
                                >
                                    <div
                                        className={`w-[140px] h-[140px] rounded-full flex items-center justify-center ${category.color}`}
                                    >
                                        <img
                                            src={category.img}
                                            alt={category.name}
                                            className="w-[70px] h-[70px] object-contain"
                                        />
                                    </div>
                                    <span
                                        className={`font-medium text-lg ${category.active ? "text-kuduOrange" : "text-black"
                                            }`}
                                    >
                                        {category.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}
                </Carousel>

                {/* Mobile Carousel */}
                <Carousel  className="rounded-lg flex md:hidden"
                    prevArrow={({ handlePrev }) => (
                        <IconButton
                            variant="text"
                            color="black"
                            size="sm"
                            onClick={handlePrev}
                            className="!absolute top-2/4 left-2 -translate-y-2/4 bg-black text-white shadow-md rounded-full 
                           hover:bg-black !focus:bg-black active:bg-black !disabled:bg-black"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="3"
                                className="-ml-1 h-6 w-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </IconButton>
                    )}
                    nextArrow={({ handleNext }) => (
                        <IconButton
                            variant="text"
                            color="black"
                            size="sm"
                            onClick={handleNext}
                            className="!absolute top-2/4 right-2 -translate-y-2/4 bg-black text-white shadow-md rounded-full 
                           hover:bg-black !focus:bg-black active:bg-black !disabled:bg-black"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="3"
                                className="ml-1 h-6 w-6"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </IconButton>
                    )}>
                    {slidesXS.map((slide, slideIndex) => (
                        <div className="flex gap-5 justify-center mt-8" key={`slide-xs-${slideIndex}`}>
                            {slide.map((category, index) => (
                                <div
                                    key={`slide-mobile-${index}`}
                                    className="w-[90px] flex flex-col items-center gap-2"
                                >
                                    <div className={`w-[90px] h-[90px] rounded-full flex items-center justify-center ${category.color}`}>
                                        <img src={category.img} alt={category.name} className="w-[50px] h-[50px] object-contain" />
                                    </div>
                                    <span className={`font-medium text-sm ${category.active ? 'text-kuduOrange' : 'text-black'}`}>
                                        {category.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}
