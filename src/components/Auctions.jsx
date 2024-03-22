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


   const handleInfo = (auctionID) => {
    //Sätta in functionalitet för att hantera att ändra en auctions information, alltså en PUT METHOD till web api,
    //loggar konsol för click function 
    console.log('Change for this auction', auctionID)
   }

   //Time Stamp Formatter, så vi bara visar årtal månda och datum samt 24h tid vid start datum och slut datum på auctions - skickar med formatTimestamp vid StartDate och EndDate
   const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };


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
                      <p className='card-text'>Start Date: <br />{formatTimestamp(auction.StartDate)}</p>
                      <p className='card-text'>End Date: <br />{formatTimestamp(auction.EndDate)}</p>
                      <p className='card-text'>Created By: <br />{auction.CreatedBy}</p>
                      <div className="btn-group" role="group" aria-label="Auction Actions">
                            <button className="btn btn-primary" onClick={() => handleBid(auction.AuctionID)}>Bid</button>
                            <button className="btn btn-secondary" onClick={() => handleInfo(auction.AuctionID)}>Biddings</button>
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
