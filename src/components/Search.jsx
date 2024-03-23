import React, { useState, useEffect } from "react";
import styles from "./search.module.css";

const URL = "https://auctioneer.azurewebsites.net/auction/s8w";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    async function fetchApi() {
      const res = await fetch(URL);
      const data = await res.json();
      console.log(data);
      setSearchData(data);
    }
    fetchApi();
  }, []);

  const handleSearch = () => {
    const searchedItem = searchData.find(
      (item) => item.AuctionID === parseInt(searchTerm)
    );
    if (searchedItem) {
      console.log("Sökt objekt:", searchedItem);
    } else {
      console.log("Ingen matchning hittades för ID:", searchTerm);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        type="text"
        placeholder="Search for Id..."
      />
      <button onClick={handleSearch}>Fetch</button>
    </div>
  );
}
