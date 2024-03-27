import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./auctiondetails.module.css";

const AuctionDetails = ({ auctions }) => {
  const { auctionId } = useParams();
  const [auction, setAuction] = useState(null);

  useEffect(() => {
    // Sök efter auktionen med matchande ID
    const foundAuction = auctions.find(
      (auction) => auction.AuctionID === parseInt(auctionId)
    );
    if (foundAuction) {
      setAuction(foundAuction);
    } else {
      // Hantera scenario när auktionen inte hittas
      console.log("Auction not found");
    }
  }, [auctionId, auctions]);

  return (
    <div className={styles.AuctionDetails}>
      {auction ? (
        <div>
          <h2>Auction Details</h2>
          <p>Title: {auction.Title}</p>
          <p>Description: {auction.Description}</p>
          <p>Start Date: {auction.StartDate}</p>
          <p>End Date: {auction.EndDate}</p>
          <p>Highest Bid {auction.HighestBid}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AuctionDetails;
