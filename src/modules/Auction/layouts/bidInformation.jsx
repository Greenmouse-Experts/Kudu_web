import { Button } from "@material-tailwind/react";
import React from "react";

const BidInformation = () => {
    return (
        <div className="max-w-md mx-auto rounded-lg bg-white p-4">
            <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
                <h2 className="text-sm font-semibold">Bid Information</h2>
            </div>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-300">
                    <span className="font-medium">Sale Status:</span>
                    <span>Minimum Bid</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-300">
                    <span className="font-medium">Time Left:</span>
                    <span className="text-[rgba(255,15,0,1)] font-[500]">4D 1H 58min</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-300">
                    <span className="font-medium">Current Bid:</span>
                    <span className="font-[500]">$ 80,000</span>
                </div>
                <div className="flex flex-col gap-2 justify-between pb-3 border-b border-gray-300">
                    <span className="font-medium">Your Bid:</span>
                    <div className="flex flex-row gap-2">
                        <p className="font-[500] mt-2">$</p>
                        <input type="text" className="border focus:outline-none border-gray-300 rounded-lg p-2 w-full" />
                    </div>
                </div>
                <Button className="w-full py-2 px-4 flex justify-center gap-2 bg-kuduOrange normal-case text-white rounded-lg font-[500] transition-colors">
                    <span className="font-semibold text-sm normal-case">Bid Now</span>
                </Button>
            </div>
        </div>
    )
};

export default BidInformation;
