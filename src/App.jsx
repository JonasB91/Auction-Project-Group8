import "./App.css";
import { useState, useEffect } from "react";
import Search from "./components/Search";
import { Routes, Route } from "react-router-dom";

const URL = "https://auctioneer.azurewebsites.net/auction/s8w";

function App() {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      const res = await fetch(URL);
      const data = await res.json();
      setAuctions(data);
    }
    fetchApi();
  }, []);
  return (
    <>
      <Search />
    </>
  );
}

export default App;
