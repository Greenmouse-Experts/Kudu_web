import { Carousel, IconButton } from "@material-tailwind/react";
import Imgix from "react-imgix";

export default function CategoriesSection() {
    const categoriesArr = [
        {
            name: 'Trending',
            color: 'bg-kuduStrayBlue',
            img: 'https://res.cloudinary.com/do2kojulq/image/upload/v1735481488/kudu_mart/trending_fire_ivir2f.png',
            active: true,
        },
        {
            name: 'Vehicles',
            color: 'bg-kuduPink',
            img: 'https://res.cloudinary.com/do2kojulq/image/upload/v1735481489/kudu_mart/car_wosdu8.png',
            active: false
        },
        {
            name: 'Property',
            color: 'bg-kuduOrangeLight',
            img: 'https://res.cloudinary.com/do2kojulq/image/upload/v1735481489/kudu_mart/house_gcwp8t.png',
            active: false
        },
        {
            name: 'Sports',
            color: 'bg-kuduLightGreen',
            img: 'https://res.cloudinary.com/do2kojulq/image/upload/c_fill,w_360,h_360,g_auto/v1735481489/kudu_mart/sports_konvsu.png',
            active: false
        },
        {
            name: 'Devices',
            color: 'bg-kuduPurple',
            img: 'https://res.cloudinary.com/do2kojulq/image/upload/v1735481488/kudu_mart/phone_mahapu.png',
            active: false
        },
        {
            name: 'Beauty',
            color: 'bg-kuduStrayBlue',
            img: 'https://res.cloudinary.com/do2kojulq/image/upload/v1735481489/kudu_mart/beauty_wt1imb.png',
            active: false
        },
    ];


    // Helper function to chunk the array
    const chunkArray = (arr, size) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    };

    const slidesXS = chunkArray(categoriesArr, 4);
    const slides = chunkArray(categoriesArr, 8);

    return (
        <>
            <div className="flex w-full flex-col lg:gap-5 md:gap-5 gap-2">
                <div className="flex w-full">
                    <p className="lg:text-lg md:text-lg text-xs lg:text-left md:text-left text-center text-black font-semibold flex flex-grow">
                        Explore Popular Categories
                    </p>
                    <p className="text-xs cursor-pointer font-semibold underline text-kuduOrange flex">
                        View all Categories
                    </p>
                </div>
                <div className="w-full mx-auto md:mt-3">
                    <Carousel className="rounded-lg md:flex hidden carouix"
                        prevArrow={({ handlePrev }) => (
                            <IconButton
                                variant="text"
                                color="black"
                                size="md"
                                onClick={handlePrev}
                                className="!absolute top-2/4 bg-white shadow-md rounded-full left-4 -translate-y-2/4 
                       !hover:bg-white !focus:bg-white !active:bg-white !disabled:bg-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" class="-ml-1 h-7 w-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path>
                                </svg>
                            </IconButton>
                        )}
                        nextArrow={({ handleNext }) => (
                            <IconButton
                                variant="text"
                                color="black"
                                size="md"
                                onClick={handleNext}
                                className="!absolute top-2/4 !right-4 bg-white hover:bg-white !focus:bg-white active:bg-white !disabled:bg-white shadow-md rounded-full -translate-y-2/4"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" class="ml-1 h-7 w-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
                                </svg>
                            </IconButton>
                        )}
                    >
                        {slides.map((slide, slideIndex) => (
                            <div className="flex md:gap-10 py-2 gap-4 justify-center" key={`slide-${slideIndex}`}>
                                {slide.map((category, index) => (
                                    <div
                                        key={`slide1-div${index}`}
                                        className="w-[100px] p-1 gap-2 flex flex-col rounded-full text-center"
                                    >
                                        {category.active ?
                                            <div className="w-[95px] h-[95px] -mx-2 top-1 rounded-full border-2 border-kuduOrange absolute" />
                                            :
                                            <></>
                                        }
                                        <div className={`w-[80px] h-[80px] rounded-full p-4 flex justify-center ${category.color}`}>
                                            <Imgix src={category.img} width={50} // Reduced size
                                                height={50} // Reduced size
                                                sizes="(max-width: 768px) 50px, 80px"
                                                className="max-w-[50px] max-h-[50px] md:max-w-[80px] md:max-h-[80px] object-contain" />
                                        </div>
                                        <span className={`w-full flex font-[500] md:text-sm text-xs justify-center ${category.active ? 'text-kuduOrange' : 'text-black'}`}>
                                            {category.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </Carousel>


                    {/** FOR MOBILE DEVICES */}

                    <Carousel className="rounded-lg md:hidden flex carouix"
                        prevArrow={({ handlePrev }) => (
                            <IconButton
                                variant="text"
                                color="black"
                                size="md"
                                onClick={handlePrev}
                                className="!absolute top-2/4 bg-white shadow-md rounded-full left-4 -translate-y-2/4 
                       hover:bg-white !focus:bg-white active:bg-white !disabled:bg-white"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" class="-ml-1 h-7 w-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path>
                                </svg>
                            </IconButton>
                        )}
                        nextArrow={({ handleNext }) => (
                            <IconButton
                                variant="text"
                                color="black"
                                size="md"
                                onClick={handleNext}
                                className="!absolute top-2/4 !right-4 bg-white hover:bg-white !focus:bg-white active:bg-white !disabled:bg-white shadow-md rounded-full -translate-y-2/4"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width={10} height={10} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" class="ml-1 h-7 w-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
                                </svg>
                            </IconButton>
                        )}
                    >
                        {slidesXS.map((slide, slideIndex) => (
                            <div className="flex md:gap-10 gap-4 mt-2" key={`slide-${slideIndex}`}>
                                {slide.map((category, index) => (
                                    <div
                                        key={`slide1-div${index}`}
                                        className="w-[80px] md:w-[100px] relative p-1 gap-2 flex flex-col items-center rounded-full text-center"
                                    >
                                        {category.active ?
                                            <div className="w-[68px] h-[68px] -top-0 md:w-[90px] md:h-[90px] rounded-full border-2 border-kuduOrange absolute" />
                                            :
                                            <></>
                                        }
                                        {/* Adjust the size of the container */}
                                        <div
                                            className={`w-[60px] h-[60px] md:w-[80px] md:h-[80px] rounded-full flex justify-center items-center ${category.color}`}
                                        >
                                            {/* Adjust the size of the image */}
                                            <Imgix
                                                src={category.img}
                                                width={50} // Reduced size
                                                height={50} // Reduced size
                                                sizes="(max-width: 768px) 50px, 80px"
                                                className="max-w-[50px] max-h-[50px] md:max-w-[80px] md:max-h-[80px] object-contain"
                                            />
                                        </div>
                                        <span
                                            className={`w-full flex font-[500] md:text-sm text-xs justify-center ${category.active ? "text-kuduOrange" : "text-black"
                                                }`}
                                        >
                                            {category.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </>
    )
}