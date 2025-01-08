import { Button } from "@material-tailwind/react";
import Imgix from "react-imgix";

export default function SearchSection() {

    return (
        <div className="relative w-full lg:min-h-[400px] md:min-h-[400px] h-[250px] z-50 bg-white py-4 md:pt-10 lg:mt-7 md:mt-20 mt-10">
            <div
                style={{
                    backgroundImage: `
          url(https://res.cloudinary.com/do2kojulq/image/upload/v1736335749/kudu_mart/92700309e4fbd1b1c6264445791a1ac1_l6xfka.png),
          linear-gradient(94.9deg, #0C0923 21.28%, #190416 76.35%)
        `,
                    backgroundBlendMode: "overlay",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                }}
                className="h-[32vh] md:h-[60vh]"
            />
            <div className="absolute inset-0 flex w-full md:flex-row flex-col items-center gap-6 md:px-44 md:mt-20 justify-center px-4">
                <div className="flex md:w-1/2 w-full flex-col gap-2 z-0">
                    <p className="text-white text-base md:text-2xl font-bold lg:flex flex md:mb-6">
                        Buy & Sell Everything in Conditions of Your Choice
                    </p>
                    <div className="flex w-full flex-col gap-5 z-0">
                        <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-lg w-full">
                            <input
                                type="text"
                                className="md:w-3/5 w-full px-4 py-3 rounded-lg md:px-6 md:py-2 outline-none text-[13px] md:text-lg text-gray-700"
                                placeholder="Find anything on Kudu..."
                                style={{ fontSize: '13px' }}
                            />
                        </div>

                        <div className="flex justify-center w-full">
                            <Button className="bg-kuduOrange text-white text-sm px-4 py-2 lg:w-1/5 md:w-1/5 w-1/3 md:px-6 rounded-md transition duration-300">
                                Search
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="md:flex hidden md:w-1/2 w-full flex-col gap-5 z-0">
                    <Imgix src="https://res.cloudinary.com/do2kojulq/image/upload/v1736337300/kudu_mart/Group_1321314888_pr8fdg.png"
                        sizes="100vw"
                        alt="Kudu Mart" width={300} height={300} className="w-full h-full object-cover" />
                </div>
            </div>
            {/* Overlay
            <div className="absolute inset-0 flex flex-col w-full items-center gap-6 justify-center px-4">
                <p className="text-white text-base sm:text-3xl md:text-3xl lg:text-3xl font-bold lg:flex flex md:mb-6 text-center">
                    Search Any Item, Anytime!
                </p>

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
            </div> */}
        </div>
    )
}