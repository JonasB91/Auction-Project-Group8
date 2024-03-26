import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import NavigationBar from './components/NavigationBar';
import CreateAuction from './components/CreateAuction';
import Auctions from './components/Auctions';
import ClosedAuction from './components/ClosedAuction';
import DeleteAuctionComponent from './components/DeleteAuctionComponent';

const App = () => {
  
  return (
    <Router>
      <div>
        <NavigationBar />
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
