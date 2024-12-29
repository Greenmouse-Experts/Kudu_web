import { Button } from "@material-tailwind/react";
import Imgix from "react-imgix";

export default function SearchSection() {

    return (
        <div className="relative w-full lg:min-h-[440px] md:min-h-[400px] h-[250px] z-50 lg:py-10 md:py-10 py-4 lg:mt-7 md:mt-10 mt-14 bg-black">
            <Imgix
                src="https://res.cloudinary.com/do2kojulq/image/upload/v1735426602/kudu_mart/shoppingBag_xu9ked.png"
                alt="Background image"
                sizes="100vw"
                className="opacity-70 w-full h-[230px] md:h-[400px] object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 flex flex-col items-center gap-6 justify-center px-4">
                {/* Heading */}
                <p className="text-white text-base sm:text-3xl md:text-3xl lg:text-3xl font-bold lg:flex flex md:mb-6 text-center">
                    Search Any Item, Anytime!
                </p>

                {/* Search Bar */}
                <div className="flex w-full sm:w-10/12 md:w-7/12 relative justify-center">
                    <span className="absolute lg:block md:block hidden" style={{ top: '-85%', right: '-15%' }}>
                        <img
                            src="/kudu-circle.gif"
                            alt="Animated gif"
                            width={300}
                            height={300}
                        />
                    </span>
                    <div className="flex w-full flex-col gap-5 z-0">
                        <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-lg w-full">
                            <input
                                type="text"
                                className="md:w-3/5 w-full px-4 py-3 rounded-lg md:px-6 md:py-3 outline-none text-[13px] md:text-lg text-gray-700"
                                placeholder="Find anything on Kudu..."
                                style={{ fontSize: '13px' }}
                            />
                        </div>

                        <div className="flex justify-center w-full">
                            <Button className="bg-kuduOrange text-white text-sm px-4 py-2 lg:w-1/5 md:w-1/5 w-1/3 md:px-6 md:py-3 rounded-md transition duration-300">
                                Search
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}