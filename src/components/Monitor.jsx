import { useEffect, useState } from "react";
import { useSocket } from "../store/SocketContext.jsx";
import useApiMutation from "../api/hooks/useApiMutation.jsx";

const Monitor = ({ auctionProductId, currency }) => {
  const socket = useSocket();
  const [currentBid, setCurrentBid] = useState(null);
  const [auctionStatus, setAuctionStatus] = useState("Auction Ongoing 🟢");
  const [loading, setLoading] = useState(true);
  const [bidders, setBidders] = useState([]);
  const [winner, setWinner] = useState(null);
  const [winningBid, setWinningBid] = useState(null);

  const { mutate } = useApiMutation();


  useEffect(() => {
    getAuctionBidders()
  }, []);


  const getAuctionBidders = () => {
    setLoading(true);
    mutate({
        url: `/user/auction/product/bidders?auctionproductId=${auctionProductId}`,
        method: 'GET',
        headers: true,
        hideToast: true,
        onSuccess: (response) => {
            setBidders(response.data.data);
            setLoading(false);
        },
        onError: () => {
            setLoading(false)
        },
    });
}





  useEffect(() => {
    if (!socket) return;

    // Join the auction room
    socket.emit("joinAuction", auctionProductId);

    // Listen for new bids
    const handleNewBid = (data) => {
      setCurrentBid(data.bidAmount);
    };

    // Listen for auction end
    const handleAuctionEnd = (data) => {
      setAuctionStatus("Auction Ended 🚫");
      setWinner(data.winner ? `${data.winner.firstName} ${data.winner.lastName}` : "No Winner");
      setWinningBid(data.winningBid);
    };

    socket.on("newBid", handleNewBid);
    socket.on("auctionEnded", handleAuctionEnd);

    return () => {
      socket.off("newBid", handleNewBid);
      socket.off("auctionEnded", handleAuctionEnd);
    };
  }, [socket, auctionProductId]);



  return (
    <div className="max-w-md mx-auto rounded-lg bg-white p-4">
      <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
        <h2 className="text-sm font-semibold">{auctionStatus}</h2>
      </div>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between py-2 border-b border-gray-300">
          <span className="font-medium">Current Bid:</span>
          <span className="capitalize">{currency} {currentBid}</span>
        </div>
      </div>
    </div>
  );
};

export default Monitor;
