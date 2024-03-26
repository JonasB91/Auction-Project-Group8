import styles from "./searchresult.module.css";
import React from "react";

export default function SearchResult({ result }) {
  return (
    <div className={styles.auctionInfo}>
      <h2>Search results</h2>
      <p className={styles.itemName}>Auktion ID: {result.AuctionID}</p>
      <p>Title: {result.Title}</p>
      <p>Description: {result.Description}</p>
      <p>Start date: {result.StartDate}</p>
      <p>End date: {result.EndDate}</p>
      <p>Starting price: ${result.StartingPrice}</p>
    </div>
  );
}
