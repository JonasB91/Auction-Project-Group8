import React, { useState, useEffect } from 'react'


const Auctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://auctioneer.azurewebsites.net/auction/s8w')
      .then(response => {
        if(!response.ok) {
          throw new Error ('Error fetching auctions!');
        }
        return response.json();
      })
      .then(data => {
        setAuctions(data)
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  // Functions för varje button hantering av bid / delete / ändra auction,
   const handleBid = (auctionID) => {
    //sätt in functionalitet för hantera bids på korrekt auction
    //Kommer logga i konsol just nu bara för att se att det fungerar
    console.log('bid clicked for auction', auctionID)
   };

   const handleDelete = (auctionID) => {
    //Sätta in functionalitet för att hantera delete av en auction, 
    //loggar i konsol för att se click att detta fungerar
    console.log('Deleted this Auction for:', auctionID)
   }

   const handleChange = (auctionID) => {
    //Sätta in functionalitet för att hantera att ändra en auctions information, alltså en PUT METHOD till web api,
    //loggar konsol för click function 
    console.log('Change for this auction', auctionID)
   }


  return (
    <div className='container'>
        <h2>All Auctions Available</h2>
        {error && <div className='alert alert-danger' role='alert'> {error}</div>}
        <div className='row row-cols-1 row-cols-md-3 g-4'>
            {auctions.map(auction => (
                <div className='col' key={auction.AuctionID}>
                  <div className='card h-100'>
                    <div className='card-body d-flex flex-column justify-content-between'>
                      <h5 className='card-title'>Title: {auction.Title}</h5>
                      <p className='card-text'>Description: <br />{auction.Description}</p>
                      <p className='card-text'>Starting Price: <br />{auction.StartingPrice}</p>
                      <p className='card-text'>Start Date: <br />{auction.StartDate}</p>
                      <p className='card-text'>End Date: <br />{auction.EndDate}</p>
                      <p className='card-text'>Created By: <br />{auction.CreatedBy}</p>
                      <div className="btn-group" role="group" aria-label="Auction Actions">
                            <button className="btn btn-primary" onClick={() => handleBid(auction.AuctionID)}>Bid</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(auction.AuctionID)}>Delete</button>
                            <button className="btn btn-secondary" onClick={() => handleChange(auction.AuctionID)}>Change</button>
                          </div>
                      </div>
                    </div>
                </div>
              ))}
        </div>
    </div>
  );
};

export default Auctions;
