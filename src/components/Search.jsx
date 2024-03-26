import React, { useState, useEffect } from "react";
import styles from "./search.module.css";
import SearchResult from "./SearchResult";

const URL = "https://auctioneer.azurewebsites.net/auction/s8w";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [notFound, setNotFound] = useState(false);

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
    setNotFound(false);
    const searchedItem = searchData.find(
      (item) => item.AuctionID === parseInt(searchTerm)
    );
    if (searchedItem) {
      setSearchResult(searchedItem); // Spara sökresultatet i state
    } else {
      setNotFound(true);
      setSearchResult(null); // Återställ sökresultatet om ingen matchning hittades
      console.log("Ingen matchning hittades för ID:", searchTerm);
    }
  };

  const handleSearchTerm = (e) => {
    setNotFound(false);
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        onChange={handleSearchTerm}
        value={searchTerm}
        type="text"
        placeholder="Search for Id..."
      />
      <button onClick={handleSearch}>Fetch</button>
      {notFound && <p>Id does not match: {searchTerm}</p>}

      {searchResult && <SearchResult result={searchResult} />}
    </div>
  );
}
