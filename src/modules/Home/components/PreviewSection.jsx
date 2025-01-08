import Imgix from "react-imgix";
import { Card } from "@material-tailwind/react";

export default function PreviewSection() {
    return (
        <>
            <div className="relative w-full md:h-[465px] md:mt-8 mt-3 xl:h-[577px] overflow-hidden">
                <div className="w-full flex flex-col gap-2 justify-center items-center">
                    <div className="md:w-1/3 w-full flex flex-col gap-5 z-0">
                        <Imgix
                            src="https://res.cloudinary.com/do2kojulq/image/upload/v1736350399/kudu_mart/Group_1321314869_wgkdh4.png"
                            width={300}
                            height={300}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="md:w-[40%] flex">
                        <p className="text-sm text-center">
                            Do more with kudu mart today, sign up and lets get started!
                        </p>
                    </div>
                </div>
                <div className="w-full flex md:flex-row flex-col gap-5 z-0">
                    <div
                        className="grid grid-cols-1 md:grid-cols-3 mx-10 mt-14 mb-8 md:mb-0 gap-8"
                        style={{ position: "relative" }}
                    >
                        <Card
                            className="p-8 rounded-md h-full w-full"
                            style={{
                                gap: "0px",
                                border: "1px solid transparent",
                                opacity: "1",
                                transform: "rotate(6.8deg)",
                            }}
                        >
                            <div className="w-full flex justify-center">
                                <Imgix src="https://res.cloudinary.com/do2kojulq/image/upload/v1736351923/kudu_mart/Ellipse_2123_yacxon.png"
                                    width={100}
                                    height={100}
                                    className="w-[30px] h-[30px]"
                                />
                            </div>
                            <div className="w-full flex mt-3 justify-center">
                                <p className="text-sm font-semibold text-center">
                                    AUCTION
                                </p>
                            </div>
                            <div className="w-full flex mt-5 justify-center">
                                <p className="text-sm text-center">
                                    You can auction what you want to sell and have people bid for it. Then the highest bidder goes home with it.
                                </p>
                            </div>
                        </Card>
                        <Card
                            className="p-8 rounded-md h-full w-full"
                            style={{
                                gap: "0px",
                                border: "1px solid transparent",
                                opacity: "1",
                                transform: "rotate(-2.54deg)",
                            }}
                        >
                            <div className="w-full flex justify-center">
                                <Imgix src="https://res.cloudinary.com/do2kojulq/image/upload/v1736352301/kudu_mart/Ellipse_2123_aoco5z.png"
                                    width={100}
                                    height={100}
                                    className="w-[30px] h-[30px]"
                                />
                            </div>
                            <div className="w-full flex mt-3 justify-center">
                                <p className="text-sm font-semibold text-center">
                                    SELL ANYTHING
                                </p>
                            </div>
                            <div className="w-full flex mt-5 justify-center">
                                <p className="text-sm text-center">
                                    You can sell any item eg; cars, devices, and more in any condition, refurbished, new, and used.
                                </p>
                            </div>
                        </Card>
                        <Card
                            className="p-8 rounded-md h-full w-full"
                            style={{
                                gap: "0px",
                                border: "1px solid transparent",
                                opacity: "1",
                                transform: "rotate(-2.54deg)",
                            }}
                        >
                            <div className="w-full flex justify-center">
                                <Imgix src="https://res.cloudinary.com/do2kojulq/image/upload/v1736352487/kudu_mart/Ellipse_2123_1_m4izhl.png"
                                    width={100}
                                    height={100}
                                    className="w-[30px] h-[30px]"
                                />
                            </div>
                            <div className="w-full flex mt-3 justify-center">
                                <p className="text-sm font-semibold text-center">
                                    BID YOUR PRICE
                                </p>
                            </div>
                            <div className="w-full flex mt-5 justify-center">
                                <p className="text-sm text-center">
                                    Place a bid on products you want to buy and stand a chance to go home with it as the highest bidder
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}