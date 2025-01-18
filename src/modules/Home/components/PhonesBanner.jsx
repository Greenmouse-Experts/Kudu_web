const PhonesBanner = () => {
    return (
        <>
            
            <div className="flex flex-col md:flex-row items-center justify-between relative w-full min-w-screen-xl mx-auto h-auto md:h-60">
                {/* Background section with split colors */}
                <div className="flex flex-col md:flex-row w-full h-full">
                    {/* Left background color (Peach) */}
                    <div className="bg-kuduSkyBlue w-full md:w-[73%] xl:w-[78%] p-6 md:h-[300px] h-[280px] lg:h-full"></div>

                    {/* Right background color (Orange) */}
                    <div className="w-full md:w-[27%] xl:w-[22%] md:h-full h-[100px] sm:h-[300px]" style={{ backgroundColor: "rgba(100, 158, 255, 1)" }}></div>
                </div>

                {/* Content section with text, button, and images */}
                <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-6 py-8 md:py-0">
                    {/* Left text and button section */}
                    <div className='flex flex-grow relative w-full md:px-6'>
                        <div className="flex flex-col justify-center sm:items-center md:items-start sm:w-full max-w-full md:max-w-xs gap-4 text-center md:text-left z-10">
                            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                                Upgrade to the best of the digital age
                            </h2>
                            <button className="mx-auto md:mx-0 px-6 py-3 flex md:text-lg text-base gap-2 font-semibold justify-center text-black w-4/5 sm:w-1/2 md:w-3/4 border border-black transition duration-300 ease-in-out">
                                <p className='flex'>SHOP TECH</p>
                                <span className="flex flex-col justify-center h-full"><svg width="27" height="13" viewBox="0 0 27 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M26.5 6.5L16.5 0.726497V12.2735L26.5 6.5ZM0.5 7.5H17.5V5.5H0.5V7.5Z" fill="#000" />
                                </svg></span>
                            </button>
                        </div>
                    </div>

                    {/* Right image section with shoes */}
                    <div className="relative flex flex-row justify-end sm:justify-center h-full w-full md:w-auto z-10 md:gap-8 md:top-0 top-[0%]">
                        <img
                            src="https://res.cloudinary.com/do2kojulq/image/upload/v1735426588/kudu_mart/game_console_mytxfs.png"
                            alt="console"
                            className="w-1/2 md:w-1/2 sm:w-2/5 object-contain relative md:left-[15%] lg:left-[10%] xl:left-[7%]"
                        />
                        <img
                            src="https://res.cloudinary.com/do2kojulq/image/upload/v1735426594/kudu_mart/phone_pack_w5hyn3.png"
                            alt="phone pack"
                            className="w-1/2 md:w-1/2 sm:w-2/5 object-contain"
                        />
                    </div>
                </div>
            </div>

        </>
    );
};

export default PhonesBanner;
