import React, { useState } from 'react';

const DeleteAuctionComponent = () => {
  const [auctionId, setAuctionId] = useState('');
  const [message, setMessage] = useState('');

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`https://auctioneer.azurewebsites.net/s8w/api/auctions/${auctionId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      setMessage(data.message);
      setAuctionId('');
    } catch (error) {
      setMessage('Något gick fel vid borttagning av auktionen.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Ta bort aktuell auktion</h2>
      <input
        type="text"
        value={auctionId}
        onChange={(e) => setAuctionId(e.target.value)}
        placeholder="Ange auktions-ID"
      />
      <button onClick={handleDeleteClick}>Ta bort</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default DeleteAuctionComponent;
