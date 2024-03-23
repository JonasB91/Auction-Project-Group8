import React, { useState, useEffect } from "react";
import styles from "./search.module.css";
import SearchResult from "./SearchResult"; // Importera den nya komponenten

const URL = "https://auctioneer.azurewebsites.net/auction/s8w";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searchResult, setSearchResult] = useState(null); // State för att hålla sökresultatet

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
      setSearchResult(searchedItem); // Spara sökresultatet i state
    } else {
      setSearchResult(null); // Återställ sökresultatet om ingen matchning hittades
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

      {searchResult && <SearchResult result={searchResult} />}
    </div>
  );
}
