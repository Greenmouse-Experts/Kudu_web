import { useState } from "react";
import "../Home/components/style.css";
import SearchSection from "./components/SearchSection";
import DummyProduct from "./components/DummyProduct";
import DummyTrending from "./components/DummyTrending";
import DummyAution from "./components/DummyAution";
import PreviewSection from "./components/PreviewSection";
import ShoppingExperience from "./components/ShoppingExperience";
import GetApp from "./components/GetApp";
import "../Home/components/style.css";


export default function NewHome() {
    return (
        <>
            <div className="w-full flex flex-col">
                <SearchSection />
                <div className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5 bg-white h-full">
                    <div className="w-full lg:flex md:flex gap-3 md:mt-3">
                        <DummyProduct />
                    </div>
                    <div className="w-full lg:flex md:flex gap-3 md:mt-3">
                        <div className="bg-[#A5B3FF] w-full flex justify-between p-6 rounded-md mb-10 cursor-pointer">
                            <h2 className="text-lg font-semibold">Explore Popular Categories</h2>
                        </div>
                    </div>
                    <div className="w-full lg:flex md:flex gap-3 md:mt-3">
                        <DummyTrending />
                    </div>
                    <div className="w-full lg:flex md:flex gap-3 md:mt-3">
                        <DummyAution />
                    </div>
                    <div className="w-full lg:flex md:flex gap-3 md:mt-3">
                        <div className="bg-[#615353] w-full flex justify-between p-6 rounded-md cursor-pointer">
                            <h2 className="text-lg text-white font-semibold">Explore by Product Conditions</h2>
                        </div>
                    </div>
                    <div className="w-full lg:flex md:flex gap-3">
                        <PreviewSection />
                    </div>
                    <div className="w-full flex">
                        <ShoppingExperience />
                    </div>

                </div>
                <div
                    className="w-full flex flex-col xl:px-40 lg:pl-20 lg:pr-36 md:px-20 px-5 py-3 lg:gap-10 md:gap-8 gap-5"
                    style={{
                        backgroundImage: `url(https://res.cloudinary.com/ddj0k8gdw/image/upload/v1737405367/Frame_1618873123_fy7sgx.png)`,
                        backgroundBlendMode: "overlay",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "100%",
                    }}
                >
                    <div className="w-full flex flex-col gap-5">
                        <GetApp />
                    </div>
                </div>
            </div>
        </>
    );
}
