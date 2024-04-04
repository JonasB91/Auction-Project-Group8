import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import CreateAuction from "./components/CreateAuction";
import Auctions from "./components/Auctions";
import ClosedAuction from "./components/ClosedAuction";
import Search from "./components/Search";
import DeleteAuctionComponent from "./components/DeleteAuctionComponent";
import AuctionDetails from "./components/AuctionDetails";




const App = () => {
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
  return (
    <Router>
      <div>
        <NavigationBar />
        <div className="welcome-container">
          <h1 className="welcome-message text-center fs-2">
            Welcome to Auctioneer
          </h1>
          <p className="welcome-description text-center fs-5">
            Explore a world of auctions where you can bid on unique items, from
            art to antiques, electronics to collectibles. Dive into the
            excitement of competitive bidding and discover treasures waiting for
            you.
          </p>
        </div>
        <Search />
        <Routes>
          <Route path="/CreateAuction" element={<CreateAuction />} />
          <Route path="/Auctions" element={<Auctions />} />
          <Route path="/ClosedAuction" element={<ClosedAuction />} />
          <Route path="/auction/:auctionId" element={<AuctionDetails auctions={auctions} />}
          <Route path="/DeleteAuctionComponent" element={<DeleteAuctionComponent />}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
