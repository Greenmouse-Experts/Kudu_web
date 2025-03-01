import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuctionPage = ({ auctions }) => {
  const [activeTab, setActiveTab] = useState("popular");
  const location = useLocation();
  const navigate = useNavigate();

  const capitalizeEachWord = (str) => {
    return str
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const handleNavigate = (auctionId) => {
    const isAuctionPage = location.pathname.includes("/auction");
    const targetPath = isAuctionPage ? `product/${auctionId}` : `auction/product/${auctionId}`;
    navigate(targetPath);
  };

  return (
    <div className="w-full px-4 md:px-1">
      {/* Header */}
      <div className="bg-[#FFDEC1] flex justify-between items-center p-4 md:p-6 rounded-md md:mb-0">
        <h2 className="text-lg md:text-xl font-semibold">Auctions</h2>
        <button className="text-black font-semibold text-sm md:text-base">
          See All
        </button>
      </div>

      {/* Auction Listings */}
      {filteredAuctions.length > 0 ?
        <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 gap-4 mt-3">
          {
            filteredAuctions.map((auction) => {
              const auctionLocation = auction.vendor?.location
                ? auction.vendor.location
                : null;

              return (
                <div
                  key={auction.id}
                  className="bg-white p-3 shadow-lg border rounded-lg relative"
                >
                  {/* Product Image */}
                  <div className="flex justify-center relative md:h-[200px] h-[200px]">
                    <img
                      src={auction.image}
                      alt={auction.name}
                      className="w-full md:h-[200px] object-cover rounded-md"
                    />
                  </div>

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
                      {auctionLocation
                        ? `${auctionLocation.city}, ${auctionLocation.state}, ${auctionLocation.country}`
                        : "N/A"}
                    </span>
                  </p>

                  {/* View Details Button */}
                  <button
                    onClick={() => handleNavigate(auction.id)}
                    className="bg-[#FF6F22] text-white w-full py-3 mt-5 rounded-lg text-xs md:text-sm"
                  >
                    View Details
                  </button>

                  {/* Lot Number 
                  <p className="text-gray-500 mt-3 text-xs">
                    Lot #{" "}
                    <span className="text-[#FF6F22]">{auction.id}</span>
                  </p> */}

                  {/* Current Bid */}
                  <p className="text-base font-bold mt-3 text-green-600">
                    <small className="text-black">Current Bid:</small>{" "}
                    {auction.store.currency.symbol} {auction.price}
                  </p>

                  {/* Location */}
                  <p className="text-black text-xs mt-3">
                    Location:{" "}
                    <span className="font-semibold">
                      {auctionLocation
                        ? `${auctionLocation.city}, ${auctionLocation.state}, ${auctionLocation.country}`
                        : "N/A"}
                    </span>
                  </p>

                  {/* View Details Button */}
                  <button
                    onClick={() => handleNavigate(auction.id)}
                    className="bg-[#FF6F22] text-white w-full py-3 mt-5 rounded-lg text-xs md:text-sm"
                  >
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
        :
        <div className="w-full">
          <div className="empty-store">
            <div className="text-center">
              <img
                src="https://res.cloudinary.com/ddj0k8gdw/image/upload/v1736780988/Shopping_bag-bro_1_vp1yri.png"
                alt="Empty Store Illustration"
                className="w-80 h-80 mx-auto"
              />
            </div>
            <h3 className="text-base font-semibold mt-3 leading-loose">No Auctions Available</h3>
            <p className="text-sm font-medium leading-loose">There are no auctions available at the moment.</p>
          </div>
        </div>
      }
    </div>
  );
};

export default AuctionPage;
