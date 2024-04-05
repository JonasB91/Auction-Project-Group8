import React, { useState, useEffect } from "react";
import styles from "./search.module.css";
import SearchResult from "./SearchResult";

const URL = "https://auctioneer2.azurewebsites.net/auction/s8w";

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
    <div className="container mt-4">
      <div className="input-group mb-3">
        <input
          className={`${styles.input} ${styles.inputHalfWidth}`}
          onChange={handleSearchTerm}
          value={searchTerm}
          type="text"
          placeholder="Search..."
        />
        <button onClick={handleSearch} className="btn btn-success">Search</button>
      </div>
      {notFound && <p className="mt-2">Id does not match: {searchTerm}</p>}
      {searchResult && <SearchResult result={searchResult} />}
    </div>
  );
}