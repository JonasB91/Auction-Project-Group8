import React, { useState, useEffect } from 'react';
import DeleteButton from './DeleteButton';

const DeleteAuctionComponent = () => {
  const apiUrl = 'https://auctioneer.azurewebsites.net/auction/s8w';
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    // Hämta auktionsdata från backend med hjälp av apiUrl
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setAuctions(data))
      .catch(error => console.error('Error fetching auctions:', error));
  }, [apiUrl]);

  const handleDelete = (auctionId) => {
    // Skicka delete-förfrågan till backend för att ta bort auktionen med angivet id
    fetch(`${apiUrl}/${auctionId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        // Uppdatera lokal state för att ta bort den raderade auktionen från listan
        setAuctions(prevAuctions => prevAuctions.filter(auction => auction.id !== auctionId));
      } else {
        console.error('Failed to delete auction:', response.statusText);
      }
    })
    .catch(error => console.error('Error deleting auction:', error));
  };

  return (
    <div>
      <h2>Delete Auction List</h2>
      <ul>
        {auctions.map(auction => (
          <li key={auction.id}>
            <span>{auction.name}</span>
            <DeleteButton auctionId={auction.id} onDelete={handleDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteAuctionComponent;
