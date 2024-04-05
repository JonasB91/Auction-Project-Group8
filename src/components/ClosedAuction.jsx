import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

const ClosedAuctions = () => {
  const [closedAuctions, setClosedAuctions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://auctioneer2.azurewebsites.net/auction/s8w');
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
<div className="text-center mt-4">
  <h2>Closed Auctions</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {closedAuctions.length > 0 ? (
          closedAuctions.map(auction => (
            <div className="m-2" key={auction.Id}>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{auction.Title}</Card.Title>
                  <Card.Text>
                    {auction.Description}
                  </Card.Text>
                  <Card.Text>
                    End Date: {new Date(auction.EndDate).toLocaleString()}
                  </Card.Text>
                  <Card.Text>
                    Highest Bid: {auction.HighestBid ? auction.HighestBid.Amount : 'No bid'}
                  </Card.Text>
                  <Card.Text>
                    Winner: {auction.HighestBid && auction.HighestBid.Winner ? auction.HighestBid.Winner : 'No winner'}
                  </Card.Text>
                  <Card.Text>
                    Created By: {auction.CreatedBy}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p>No closed auctions found.</p>
        )}
      </div>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default ClosedAuctions;
