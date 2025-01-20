import { useState } from "react";
import ProductsSection from "./layouts/productsSection";
import Imgix from "react-imgix";
import { Link } from "react-router-dom";

export default function AuctionPage() {
    const conditionsArr = [
        {
            name: 'Popular Auctions',
            id: 'allProducts'
        },
        {
            name: "Today's Selections",
            id: 'brandProducts'
        },
        {
            name: 'Live Auctions',
            id: 'refurbishedProducts'
        },
        {
            name: 'Auction Calendar',
            id: 'usedProducts'
        },
    ]

    const [activeCondition, setActiveCondition] = useState('allProducts');


    return (
        <>
            <div className="w-full flex flex-col h-full bg-kuduLightBlue">
                <div className="w-full flex flex-col md:gap-10 bg-kuduLightBlue h-full mt-14 md:mt-16">
                    <div className="relative w-full h-[100px] md:h-auto flex flex-grow z-50">
                        <Imgix
                            src="https://res.cloudinary.com/do2kojulq/image/upload/v1735426623/kudu_mart/auction_frame_lscwdh.png"
                            alt="Background image"
                            width={2180}
                            height={530}
                            className="w-full object-cover h-full"
                        />
                    </div>
                    <div className="w-full flex flex-col xl:px-80 lg:pl-44 lg:pr-36 md:px-4 px-5 py-3 md:py-0 lg:gap-10 md:gap-8 gap-5 bg-kuduLightBlue h-full">
                        <div className="w-full flex">
                            <div className="flex w-full flex-col lg:gap-5 md:gap-5 gap-2">
                                <div className="flex w-full">
                                    <p className="lg:text-lg md:text-lg text-xs lg:text-left md:text-left text-center text-black font-semibold flex flex-grow">
                                        SORT BY
                                    </p>
                                    <p className="md:text-sm text-xs cursor-pointer font-semibold underline text-kuduOrange flex">
                                        <Link to={'/auction/all-auctions'}>
                                            View all Auctions
                                        </Link>
                                    </p>
                                </div>
                                <div className="grid w-full lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4">
                                    {conditionsArr.map((condition, index) => (
                                        <div onClick={() => setActiveCondition(condition.id)}
                                            className={`flex flex-col gap-4 lg:py-6 py-4 justify-center lg:px-10 md:px-10 px-4 items-center cursor-pointer rounded-lg shadow-sm
                            ${activeCondition === condition.id ? 'bg-kuduOrange text-white' : 'bg-white text-black'}`}
                                            key={index}
                                        >
                                            <p className="lg:text-sm md:text-sm text-[12px] font-[500]">
                                                {condition.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                        <div className="w-full flex mt-3 mb-10">
                            <ProductsSection />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}