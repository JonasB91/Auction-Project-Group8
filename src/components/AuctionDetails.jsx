import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./auctiondetails.module.css";

const AuctionDetails = ({ auctions }) => {
  const { auctionId } = useParams();
  const [auction, setAuction] = useState(null);
  const [highestBid, setHighestBid] = useState(null);

  // Här hämtar vi auktionsdetaljer från den lokala listan 'auctions'
  useEffect(() => {
    const foundAuction = auctions.find(
      (auction) => auction.AuctionID === parseInt(auctionId)
    );
    if (foundAuction) {
      setAuction(foundAuction);
    } else {
      console.log("auction not found");
    }

    // Hämta buddata för den specifika auktionen från API:et
    fetch(`https://auctioneer2.azurewebsites.net/bid/s8w/${auctionId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching bid data");
        }
        return response.json();
      })

      .then((data) => {
        // Kontrollera om datan är tom innan man försöker hitta det högsta budet
        if (data.length > 0) {
          const highest = data.reduce((prev, current) =>
            prev.Amount > current.Amount ? prev : current
          );
          setHighestBid(highest);
        } else {
          console.log("No bids found for this auction");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [auctionId, auctions]);

  return (
    <div className={styles.AuctionDetails}>
      {auction && (
        <div>
          <h2>Auctions Details</h2>
          <p>Title: {auction.Title}</p>
          <p>Description: {auction.Description}</p>
          <p>Start Date: {auction.StartDate}</p>
          <p>End Date: {auction.EndDate}</p>
          {highestBid && (
            <div>
              <p>Highest Bid: {highestBid.Amount}</p>
              <p>Bidder: {highestBid.Bidder}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AuctionDetails;
