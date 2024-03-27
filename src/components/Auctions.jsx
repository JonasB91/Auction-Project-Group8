import React, { useState, useEffect } from "react";
import DeleteButton from "./DeleteButton";
import { Link } from "react-router-dom";

const Auctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [error, setError] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [selectedAuction, setSelectedAuction] = useState(null);
  const [auctionId, setAuctionId] = useState(null);
  const [bidder, setBidder] = useState("");

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

  //Hantera Bidding på en auction fetchar ner current auction som man vill buda på
  const handleBid = async (auctionID) => {
    try {
      const response = await fetch(
        `https://auctioneer.azurewebsites.net/auction/s8w/${auctionID}`
      );
      if (!response.ok) {
        throw new Error("Error fetching selected auctioin!");
      }
      const selectedAuctionData = await response.json();
      setSelectedAuction(selectedAuctionData);
      setAuctionId(selectedAuctionData.AuctionID);
      console.log("Fetched Auction", selectedAuctionData);
    } catch (error) {
      console.Error("Error fetching selected auction", error);
      setError("failed to fetch selected auction");
    }
  };

  const getBidsForSpecificAuction = (auctionId) => {
    // TODO: Hämta bud för en specifik auktion, sen ersätt {auction.StartingPrice} med högsta budet så det syns för användaren.
    // conditional rendering kanske?
    // om budet är större än auction.StartingPrice, eller
    // `https://auctioneer.azurewebsites.net/bid/s8w/${auctionId}`
  };

  //Hantera bid form för att lägga till och skicka post request till budning
  const handleBidFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://auctioneer.azurewebsites.net/bid/s8w`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            AuctionID: auctionId,
            Amount: bidAmount,
            Bidder: bidder,
            GroupCode: "s8w",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to place bid");
      }
      const data = await response.json();
      console.log("Bid successfully placed", data);
      // Uppdatera UI Här
    } catch (error) {
      console.error("Error placing bid:", error);
      setError("Failed to place bid");
    }
  };

  //Hantera information om en auktion
  const handleInfo = (auctionID) => {
    console.log("Change for this auction", auctionID);
  };

  // Hantera att ta bort en auktion
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

  //Om en auction är inom tidsramen så visas den annars inte,
  const isAuctionAvailable = (endDate) => {
    const currentDate = new Date();
    const auctionEndDate = new Date(endDate);
    return auctionEndDate > currentDate;
  };

  //Kollar och renderar auktion inom tidsramen så utgående inte visas,
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
        {auctions.map(
          (auction) =>
            isAuctionAvailable(auction.EndDate) && (
              <div className="col" key={auction.AuctionID}>
                <div className="card h-100">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title">Title: {auction.Title}</h5>
                    <p className="card-text">AuctionID: {auction.AuctionID}</p>
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
                        Bid Info
                      </button>
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
            )
        )}
      </div>
      {selectedAuction && (
        <div className="row mt-4">
          <div className="col">
            <h2>Place Bid for {selectedAuction.Title}</h2>
            <form onSubmit={handleBidFormSubmit}>
              <div className="mb-3">
                <label htmlFor="AuctionID" className="form-label">
                  Auction ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="AuctionID"
                  value={auctionId}
                  onChange={(e) => setAuctionId(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Amount" className="form-label">
                  Bid Amount
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="Amount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Bidder" className="form-label">
                  Bidder Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Bidder"
                  value={bidder}
                  onChange={(e) => setBidder(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit Bid
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Auctions;
