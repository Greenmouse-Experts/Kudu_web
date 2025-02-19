import React, { useState } from "react";

const auctions = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  name: "2014 Audi A4 All Road Premium",
  lotNumber: "65614064",
  currentBid: 63500,
  location: "Ikeja",
  image:
    "https://res.cloudinary.com/greenmouse-tech/image/upload/v1739889894/kuduMart/l_l4ywos.png",
  condition: "Used",
}));

const AuctionPage = () => {
  const [activeTab, setActiveTab] = useState("popular");

  return (
    <div className="w-full px-4 md:px-1">
      {/* Header */}
      <div className="bg-[#FFDEC1] flex justify-between items-center p-4 md:p-6 rounded-md mb-6 md:mb-10">
        <h2 className="text-lg md:text-xl font-semibold">Auctions</h2>
        <button className="text-black font-semibold text-sm md:text-base">
          See All
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto pb-5 mb-6 space-x-2">
        <button
          className={`flex-shrink-0 px-4 md:px-10 py-3 rounded-lg font-semibold ${
            activeTab === "popular"
              ? "bg-[#FF6F22] text-white"
              : "bg-transparent text-black border border-gray-300"
          }`}
          onClick={() => setActiveTab("popular")}
        >
          Popular Auctions
        </button>
        <button
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
        </button>
      </div>

      {/* Auction Listings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {activeTab === "popular" &&
          auctions.map((auction) => (
            <div
              key={auction.id}
              className="bg-white p-3 border rounded-lg relative"
            >
              <img
                src={auction.image}
                alt={auction.name}
                className="w-full object-cover rounded"
              />
              <span className="absolute top-2 right-2 bg-[#FF0F00] text-white px-2 py-1 text-xs rounded">
                {auction.condition}
              </span>
              <h3 className="text-sm md:text-base font-semibold mt-3">
                {auction.name}
              </h3>
              <p className="text-gray-500 mt-3 text-xs">
                Lot #{" "}
                <span className="text-[#FF6F22]">{auction.lotNumber}</span>
              </p>
              <p className="text-base md:text-lg font-bold mt-3 text-green-600">
                <small className="text-black">Current Bid:</small> ₦
                {auction.currentBid.toLocaleString()}
              </p>
              <p className="text-black text-xs mt-3">
                Location:{" "}
                <span className="font-semibold">{auction.location}</span>
              </p>
              <button className="bg-[#FF6F22] text-white w-full py-3 mt-5 rounded-lg text-xs md:text-sm">
                View Details
              </button>
              <div className="flex text-left text-[#FF6F22] text-sm mt-5 cursor-pointer">
                <span>📌 Monitor</span>
              </div>
            </div>
          ))}

        {activeTab === "todays" && (
          <p className="text-center col-span-full text-sm md:text-base">
            Today's Selections Content
          </p>
        )}
        {activeTab === "live" && (
          <p className="text-center col-span-full text-sm md:text-base">
            Live Auctions Content
          </p>
        )}
        {activeTab === "calendar" && (
          <p className="text-center col-span-full text-sm md:text-base">
            Auction Calendar Content
          </p>
        )}
      </div>
    </div>
  );
};

export default AuctionPage;
