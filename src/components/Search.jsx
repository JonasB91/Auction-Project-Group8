import { useState, useEffect } from "react";
import styles from "./search.module.css";

export default function Search() {
  const [search, setSearch] = useState([]);

  useEffect(() => {
    function fetchApi() {}
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
