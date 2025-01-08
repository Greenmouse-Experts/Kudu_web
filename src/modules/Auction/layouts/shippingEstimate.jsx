import React from "react";

const ShippingEstimate = () => {
  return (
    <div className="max-w-md mx-auto rounded-lg p-2">
      <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
        <h2 className="text-sm font-semibold">Shipping Estimate</h2>
        <a href="#" className="text-blue-500 text-sm font-medium">
          View map
        </a>
      </div>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between py-2 border-b border-gray-300">
          <span className="font-medium">Auction Address:</span>
          <span>Ikeja</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-300">
          <span className="font-medium">VIN:</span>
          <span className="font-[500]">WA1UFAFL5EA******</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-300">
          <span className="font-medium">Odometer:</span>
          <span className="font-[500]">223,264 mi (ACTUAL)</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-300">
          <span className="font-medium">Primary Damage:</span>
          <span className="font-[500]">MINOR DENT/SCRATCHES</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-300">
          <span className="font-medium">Cylinders:</span>
          <span className="font-[500]">4</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-300">
          <span className="font-medium">Body Style:</span>
          <span className="font-[500]">4DR SPOR</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-300">
          <span className="font-medium">Color:</span>
          <span className="font-[500]">White</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-300">
          <span className="font-medium">Engine Type:</span>
          <span className="font-[500]">2.0L 4</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-300">
          <span className="font-medium">Transmission:</span>
          <span className="font-[500]">Automatic</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-300">
          <span className="font-medium">Drive:</span>
          <span className="font-[500]">All wheel drive</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-300">
          <span className="font-medium">Vehicle Type:</span>
          <span className="font-[500]">AUTOMOBILE</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-300">
          <span className="font-medium">Fuel:</span>
          <span className="font-[500]">FLEXIBLE FUEL</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-300">
          <span className="font-medium">Keys:</span>
          <span className="font-[500]">YES</span>
        </div>
        <div className="flex justify-between py-2 border-b border-gray-300">
          <span className="font-medium">Highlights:</span>
          <span className="font-[500]">Run and Drive</span>
        </div>
      </div>
    </div>
  );
};

export default ShippingEstimate;
