import { useEffect, useState } from "react";
import { useSocket } from "../store/SocketContext.jsx";

const MonitorAuction = ({ auctionProductId }) => {
  const socket = useSocket();
  const [currentBid, setCurrentBid] = useState(null);
  const [auctionStatus, setAuctionStatus] = useState("Auction Ongoing 🟢");
  const [winner, setWinner] = useState(null);
  const [winningBid, setWinningBid] = useState(null);

  useEffect(() => {
    if (!socket) return;

    // Join the auction room
    socket.emit("joinAuction", auctionProductId);

    // Listen for new bids
    const handleNewBid = (data) => {
      console.log("New bid received:", data);
      setCurrentBid(data.bidAmount);
    };

    // Listen for auction end
    const handleAuctionEnd = (data) => {
      console.log("Auction ended:", data);
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
    <div>
      <h2>{auctionStatus}</h2>
      <h3>Current Bid: ${currentBid ?? "No bids yet"}</h3>
      {auctionStatus === "Auction Ended 🚫" && (
        <div>
          <h4>Winner: {winner}</h4>
          <h4>Winning Bid: ${winningBid}</h4>
        </div>
      )}
    </div>
  );
};

export default MonitorAuction;
