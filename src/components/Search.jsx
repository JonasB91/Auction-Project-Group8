import { useState, useEffect } from "react";
import styles from "./search.module.css";
const URL = "https://auctioneer.azurewebsites.net/auction/s8w";

export default function Search() {
  const [search, setSearch] = useState([]);

  useEffect(() => {
    function fetchApi() {
      const res = fetch(URL);
      const data = res.json;
      console.log(data);
    }
  }, []);
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        type="text"
        placeholder="Search for Id..."
      />
      <button>Fetch</button>
    </div>
  );
}
