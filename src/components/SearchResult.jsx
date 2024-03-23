import React from "react";

export default function SearchResult({ result }) {
  return (
    <div>
      <h2>Sökresultat</h2>
      <p>Auktion ID: {result.AuctionID}</p>
      <p>Titel: {result.Title}</p>
      <p>Beskrivning: {result.Description}</p>
      <p>Start datum: {result.StartDate}</p>
      <p>Slut datum: {result.EndDate}</p>
      <p>Start pris: {result.StartingPrice}</p>
    </div>
  );
}
