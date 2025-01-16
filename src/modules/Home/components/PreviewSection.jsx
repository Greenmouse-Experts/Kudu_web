import Imgix from "react-imgix";
import { Card } from "@material-tailwind/react";

export default function PreviewSection() {
    return (
        <>
            <div className="relative w-full md:h-[465px] xl:h-[577px] overflow-hidden md:mt-10 mb-5 bg-white">
                <div className="w-full flex flex-col gap-2 justify-center items-center">
                    {/* Header Section */}
                    <div className="md:w-1/2 w-full flex flex-col gap-5 z-10">
                        <Imgix
                            src="https://res.cloudinary.com/ddj0k8gdw/image/upload/v1737059210/Screenshot_2025-01-16_at_9.26.37_PM_mv3pvc.png"
                            width="100%"
                            className="w-full h-full object-cover Justting"
                            draggable="false"
                        />

                    </div>
                    <div className="md:w-[40%] flex">
                        <p className="text-lg text-center">
                            Do more with Kudu Mart today, sign up and let’s get started!
                        </p>
                    </div>
                </div>

                {/* Card Section */}
                <div className="w-full flex md:flex-row flex-col gap-5 z-0 mt-5">
                    <div className="grid grid-cols-1 md:grid-cols-3 mx-10 mt-14 mb-8 md:mb-0 gap-8" style={{ position: "relative" }}>
                        {/* Auction Card */}
                        <div
                            className="p-10 rounded-md h-full w-full shadow-md bg-white"
                            style={{
                                border: "1px solid transparent",
                                transform: "rotate(3.8deg)",
                            }}
                        >
                            <div className="w-full flex justify-center">
                                <img
                                    src="https://res.cloudinary.com/do2kojulq/image/upload/v1736351923/kudu_mart/Ellipse_2123_yacxon.png"
                                    alt="Auction Icon"
                                    className="w-[50px] h-[50px]"
                                />
                            </div>
                            <div className="w-full flex mt-3 justify-center">
                                <p className="text-lg font-semibold text-center">AUCTION</p>
                            </div>
                            <div className="w-full flex mt-4 justify-center">
                                <p className="text-sm leading-loose text-center">
                                    You can auction what you want to sell and have people bid for it. Then the highest bidder goes home with it.
                                </p>
                            </div>
                        </div>

                        {/* Sell Anything Card */}
                        <div
                            className="p-10 rounded-md h-full w-full shadow-md bg-white"
                            style={{

                                transform: "rotate(-0.54deg)",
                            }}
                        >
                            <div className="w-full flex justify-center">
                                <img
                                    src="https://res.cloudinary.com/do2kojulq/image/upload/v1736352301/kudu_mart/Ellipse_2123_aoco5z.png"
                                    alt="Sell Anything Icon"
                                    className="w-[50px] h-[50px]"
                                />
                            </div>
                            <div className="w-full flex mt-3 justify-center">
                                <p className="text-lg font-semibold text-center">SELL ANYTHING</p>
                            </div>
                            <div className="w-full flex mt-4 justify-center">
                                <p className="text-sm leading-loose text-center">
                                    You can sell any item eg; cars, devices, and more in any condition, refurbished, new, and used.
                                </p>
                            </div>
                        </div>

                        {/* Bid Your Price Card */}
                        <div
                            className="p-10 rounded-md h-full w-full shadow-md bg-white"
                            style={{
                                transform: "rotate(-2.54deg)",
                            }}
                        >
                            <div className="w-full flex justify-center">
                                <img
                                    src="https://res.cloudinary.com/do2kojulq/image/upload/v1736352487/kudu_mart/Ellipse_2123_1_m4izhl.png"
                                    alt="Bid Your Price Icon"
                                    className="w-[50px] h-[50px]"
                                />
                            </div>
                            <div className="w-full flex mt-3 justify-center">
                                <p className="text-lg font-semibold text-center">BID YOUR PRICE</p>
                            </div>
                            <div className="w-full flex mt-4 justify-center">
                                <p className="text-sm leading-loose text-center">
                                    Place a bid on products you want to buy and stand a chance to go home with it as the highest bidder.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}