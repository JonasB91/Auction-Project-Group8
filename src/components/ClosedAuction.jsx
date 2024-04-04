import React, { useState, useEffect } from 'react';

const ClosedAuctions = () => {
  const [closedAuctions, setClosedAuctions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://auctioneer.azurewebsites.net/auction/s8w');
        if (!response.ok) {
          throw new Error('Error fetching closed auctions!');
        }
        const data = await response.json();
        console.log('Closed auctions data:', data);
        setClosedAuctions(data.filter(auction => {
          const endDate = new Date(auction.EndDate);
          const currentDate = new Date();
          return endDate < currentDate;
        }));
      } catch (error) {
        console.error('Error fetching closed auctions:', error); 
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Closed Auctions</h2>
      {closedAuctions.length > 0 ? (
        <ul>
          {closedAuctions.map(auction => {
            console.log('Highest Bid:', auction.HighestBid);
            console.log('Winner:', auction.HighestBid && auction.HighestBid.Winner ? auction.HighestBid.Winner : 'No winner');

            return (
              <li key={auction.Id}>
                <p>Title: {auction.Title}</p>
                <p>Description: {auction.Description}</p>
                <p>End Date: {new Date(auction.EndDate).toLocaleString()}</p>
                {/* Säker åtkomst för att undvika kraschar om HighestBid är null eller undefined */}
                <p>Highest Bid: {auction.HighestBid ? auction.HighestBid.Amount : 'No bid'}</p>
                <p>Winner: {auction.HighestBid && auction.HighestBid.Winner ? auction.HighestBid.Winner : 'No winner'}</p>
                <p>Created By: {auction.CreatedBy}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No closed auctions found.</p>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default ClosedAuctions;
