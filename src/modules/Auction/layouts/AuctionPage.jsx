import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuctionPage = ({ auctions }) => {
  const [activeTab, setActiveTab] = useState("popular");

  const capitalizeEachWord = (str) => {
    return str
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const navigate = useNavigate();

  return (
    <div className="w-full px-4 md:px-1">
      {/* Header */}
      <div className="bg-[#FFDEC1] flex justify-between items-center p-4 md:p-6 rounded-md md:mb-0">
        <h2 className="text-lg md:text-xl font-semibold">Auctions</h2>
        <button className="text-black font-semibold text-sm md:text-base">
          See All
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto pb-5 mb-6 space-x-2">
       {/* <button
          className={`flex-shrink-0 px-4 md:px-10 py-3 rounded-lg font-semibold ${activeTab === "popular"
              ? "bg-[#FF6F22] text-white"
              : "bg-transparent text-black border border-gray-300"
            }`}
          onClick={() => setActiveTab("popular")}
        >
          Popular Auctions
        </button>
        {/* <button
          className={`flex-shrink-0 px-4 md:px-10 py-5 rounded-lg font-semibold ${
            activeTab === "todays"
              ? "bg-[#FF6F22] text-white"
              : "bg-transparent text-black border border-gray-300"
          }`}
          onClick={() => setActiveTab("todays")}
        >
          Today's Selections
        </button>
        <button
          className={`flex-shrink-0 px-4 md:px-10 py-5 rounded-lg font-semibold ${
            activeTab === "live"
              ? "bg-[#FF6F22] text-white"
              : "bg-transparent text-black border border-gray-300"
          }`}
          onClick={() => setActiveTab("live")}
        >
          Live Auctions
        </button>
        <button
          className={`flex-shrink-0 px-4 md:px-10 py-5 rounded-lg font-semibold ${
            activeTab === "calendar"
              ? "bg-[#FF6F22] text-white"
              : "bg-transparent text-black border border-gray-300"
          }`}
          onClick={() => setActiveTab("calendar")}
        >
          Auction Calendar
        </button>*/}
      </div>

      {/* Auction Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {activeTab === "popular" &&
          auctions.map((auction) => {
            const location = auction.vendor?.location
              ? JSON.parse(auction.vendor.location)
              : null;

            return (
              <div
                key={auction.id}
                className="bg-white p-3 border rounded-lg relative"
              >
                {/* Product Image */}
                <img
                  src={auction.image}
                  alt={auction.name}
                  className="w-full md:h-[300px] object-cover rounded"
                />

                {/* Condition Badge */}
                <span className={`absolute top-2 right-2 ${auction.condition === "brand_new" ? "bg-[#34A853]" : "bg-[#FF0F00]"} text-white px-2 py-1 text-xs rounded`}>
                  {capitalizeEachWord(auction.condition)}
                </span>

                {/* Auction Name */}
                <h3 className="text-sm md:text-base font-semibold mt-3">
                  {auction.name}
                </h3>

                {/* Lot Number */}
                <p className="text-gray-500 mt-3 text-xs">
                  Lot #{" "}
                  <span className="text-[#FF6F22]">{auction.id}</span>
                </p>

                {/* Current Bid */}
                <p className="text-base md:text-lg font-bold mt-3 text-green-600">
                  <small className="text-black">Current Bid:</small>{" "}
                  {auction.store.currency.symbol} {auction.price}
                </p>

                {/* Location */}
                <p className="text-black text-xs mt-3">
                  Location:{" "}
                  <span className="font-semibold">
                    {location
                      ? `${location.city}, ${location.state}, ${location.country}`
                      : "N/A"}
                  </span>
                </p>

                {/* View Details Button */}
                <button onClick={() => navigate(`product/${auction.id}`)} className="bg-[#FF6F22] text-white w-full py-3 mt-5 rounded-lg text-xs md:text-sm">
                  View Details
                </button>

                {/* Monitor Button */}
                <div className="flex text-left text-[#FF6F22] text-sm mt-5 cursor-pointer">
                  <span>📌 Monitor</span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AuctionPage;
