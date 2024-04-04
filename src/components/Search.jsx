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
    const searchedItem = searchData.find((item) =>
      item.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (searchedItem) {
      setSearchResult(searchedItem);
    } else {
      setNotFound(true);
      setSearchResult(null);
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
        placeholder="Search..."
      />
      <button onClick={handleSearch}>Search</button>
      {notFound && <p>Id does not match: {searchTerm}</p>}

      {searchResult && <SearchResult result={searchResult} />}
    </div>
  );
}
