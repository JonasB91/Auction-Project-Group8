import React, { useState, useEffect } from "react";
import DeleteButton from "./DeleteButton";
import { Link } from "react-router-dom";

const Auctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://auctioneer.azurewebsites.net/auction/s8w")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching auctions!");
        }
        return response.json();
      })
      .then((data) => {
        setAuctions(data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const handleBid = (auctionID) => {
    console.log("bid clicked for auction", auctionID);
  };

  const handleInfo = (auctionID) => {
    console.log("Change for this auction", auctionID);
  };

  const handleDelete = (auctionID) => {
    fetch(`https://auctioneer.azurewebsites.net/auction/s8w/${auctionID}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Uppdatera lokal state för att ta bort den raderade auktionen från listan
          setAuctions((prevAuctions) =>
            prevAuctions.filter((auction) => auction.AuctionID !== auctionID)
          );
        } else {
          throw new Error("Failed to delete auction");
        }
      })
      .catch((error) => {
        console.error("Error deleting auction:", error);
        setError("Failed to delete auction");
      });
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return (
    <div className="container">
      <h2>All Auctions Available</h2>
      {error && (
        <div className="alert alert-danger" role="alert">
          {" "}
          {error}
        </div>
      )}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {auctions.map((auction) => (
          <div className="col" key={auction.AuctionID}>
            <div className="card h-100">
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">Title: {auction.Title}</h5>
                <p>Auction id: {auction.AuctionID}</p>
                <p className="card-text">
                  Description: <br />
                  {auction.Description}
                </p>
                <p className="card-text">
                  Starting Price: <br />
                  {auction.StartingPrice}
                </p>
                <p className="card-text">
                  Start Date: <br />
                  {formatTimestamp(auction.StartDate)}
                </p>
                <p className="card-text">
                  End Date: <br />
                  {formatTimestamp(auction.EndDate)}
                </p>
                <p className="card-text">
                  Created By: <br />
                  {auction.CreatedBy}
                </p>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Auction Actions"
                >
                  <button
                    className="btn btn-primary"
                    onClick={() => handleBid(auction.AuctionID)}
                  >
                    Bid
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleInfo(auction.AuctionID)}
                  >
                    Biddings
                  </button>
                  <Link
                    to={`/auction/${auction.AuctionID}`} //Kanske tar bort, låter den vara just nu bara..
                    className="btn btn-secondary"
                  >
                    View Details
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(auction.AuctionID)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Auctions;
