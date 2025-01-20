import './style.css';

export default function SearchSection() {

    return (
        <div className="relative w-full z-50 bg-white py-4 lg:mt-10 md:mt-20 mt-10">
            {/* Background Section */}
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
                className="h-[70vh] md:h-[60vh] lg:h-[70vh]"
            />

            {/* Content Section */}
            <div className="w-full absolute inset-0  grid grid-cols-1 md:grid-cols-2 items-center gap-6 px-6 lg:px-20">
                {/* Left Content */}
                <div className="flex flex-col gap-4 md:text-left z-0 w-full max-w-6xl lg:pl-20 lg:mt-[-80px]">
                    <p className="text-3xl text-white sm:text-lg md:text-4xl xl:text-5xl Fonttin font-bold">
                        Buy & Sell Everything in Conditions of Your Choice
                    </p>


                    <div className="flex w-full flex-col gap-4">
                        <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-lg">
                            <input
                                type="text"
                                className="w-full px-4 py-5 sm:px-4 sm:py-3 md:px-6 md:py-5 text-sm sm:text-base md:text-lg text-gray-700 outline-none"
                                placeholder="Find anything on Kudu..."
                            />
                        </div>
                        <div className="flex sm:justify-start">
                            <button className="bg-kuduOrange text-white text-sm sm:text-base px-8 py-5 sm:py-3 md:py-4 rounded-md transition duration-300 hover:bg-opacity-90">
                                Search
                            </button>
                        </div>
                    </div>

                </div>

                {/* Right Image */}
                <div className="hidden md:flex justify-center items-center">
                    <img
                        src="https://res.cloudinary.com/do2kojulq/image/upload/v1736337300/kudu_mart/Group_1321314888_pr8fdg.png"
                        alt="Kudu Mart"
                        className="w-full"
                    />
                </div>
            </div>
        </div>
    );

}