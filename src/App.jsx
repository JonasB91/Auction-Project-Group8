import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import NavigationBar from './components/NavigationBar';
import CreateAuction from './components/CreateAuction';
import Auctions from './components/Auctions';
import ClosedAuction from './components/ClosedAuction';
import Search from "./components/Search";
import DeleteAuctionComponent from './components/DeleteAuctionComponent';




const App = () => {
  
  return (
    <Router>
      <div>
        <NavigationBar />
        <div className='welcome-container'>
          <h1 className="welcome-message text-center fs-2">Welcome to Auctioneer</h1>
          <p className="welcome-description text-center fs-5">Explore a world of auctions where you can bid on unique items, from art to antiques, electronics to collectibles. Dive into the excitement of competitive bidding and discover treasures waiting for you.</p>
        </div>
        <Search />
        <Routes>
          <Route path="/CreateAuction" element={<CreateAuction />} />
          <Route path="/Auctions" element={<Auctions />} />
          <Route path="/ClosedAuction" element={<ClosedAuction />} />
          <Route path="/DeleteAuctionComponent" element={<DeleteAuctionComponent />} />
          
        </Routes>
      </div>
    </Router>
  )
}

export default App;
