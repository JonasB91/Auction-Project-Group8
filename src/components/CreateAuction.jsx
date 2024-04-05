import React, { useEffect, useState } from 'react';


const CreateAuction = () => {
  const [inputData, setInputData] = useState({
    Title: '',
    Description: '',
    StartDate: '',
    EndDate: '',
    GroupCode: 's8w',
    StartingPrice: '',
    CreatedBy: '',
  });

  // Alert messege State
  const [alertMessege, setAlertMessege] = useState('');


  const handleDataChanged = (event) => {
    setInputData({ ...inputData, [event.target.name]: event.target.value});
  };

  //SubmitHandler som vi ska skicka upp data till web'api för att skapa ny auction
  const handleSubmit = async (event) => {
    event.preventDefault();
      try {
        const response = await fetch('https://auctioneer2.azurewebsites.net/auction/s8w', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
            body: JSON.stringify(inputData)
        });

        //om vi inte får någon response skicka med error,
        if(!response.ok) {
          throw new Error('Error Failed to create a new auction!!!');
        }

        const data = await response.json();
        setAlertMessege('Auction Created Successfully!') // alert messege om vi lyckas skapa en auction visas på sidan,
        console.log('Auction Created', data)
        //Loggar ut i konsol för att se så user har lyckats skapa en ny auction

        //Efter vi lyckats skapa en ny auction, cleara alla fields!
        setInputData({
          Title: '',
          Description: '',
          StartDate: '',
          EndDate: '',
          GroupCode: 's8w',
          StartingPrice: '',
          CreatedBy: '',
        });

      } catch (error) {
        setAlertMessege('Error... Trying to Create new auction!') // Alert messege error om vi inte lyckas skapa en auction visas på sidan
        console.error('Error Creating Auction', error)
        //Vi hanterar om user får error och inte kan skapa en auction, fånga upp error!
      }
  }



  return (
    <div className="container">
      <h2>Create New Auction</h2>
      {alertMessege && (
        <div className={`alert ${alertMessege.includes('Error') ? 'alert-danger' : 'alert-success'}`} role='alert'>
          {alertMessege}
          </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor='Title' className='form-label'>Title:</label>
          <input
           type="text"
           className='form-control'
           id='Title'
           name='Title'
           value={inputData.Title}
           onChange={handleDataChanged}
           required
           />
        </div>
        <div className="mb-3">
          <label htmlFor='Description' className='form-label'>Description:</label>
          <input
           type="text"
           className='form-control'
           id='Description'
           name='Description'
           value={inputData.Description}
           onChange={handleDataChanged}
           required
           />
        </div>
        <div className="mb-3">
          <label htmlFor='StartDate' className='form-label'>Start Date:</label>
          <input
           type="datetime-local"
           className='form-control'
           id='StartDate'
           name='StartDate'
           value={inputData.StartDate}
           onChange={handleDataChanged}
           required
           />
        </div>
        <div className="mb-3">
          <label htmlFor='EndDate' className='form-label'>End Date:</label>
          <input
           type="datetime-local"
           className='form-control'
           id='EndDate'
           name='EndDate'
           value={inputData.EndDate}
           onChange={handleDataChanged}
           required
           />
        </div>
        <div className="mb-3">
          <label htmlFor='StartingPrice' className='form-label'>Starting Price:</label>
          <input
           type="number"
           className='form-control'
           id='StartingPrice'
           name='StartingPrice'
           value={inputData.StartingPrice}
           onChange={handleDataChanged}
           required
           />
        </div>
        <div className="mb-3">
          <label htmlFor='CreatedBy' className='form-label'>Created By:</label>
          <input
           type="text"
           className='form-control'
           id='CreatedBy'
           name='CreatedBy'
           value={inputData.CreatedBy}
           onChange={handleDataChanged}
           required
           />
        </div>
        <button type='submit' className='btn btn-primary'>Add Auction</button>
      </form>
    </div>
  )
}

export default CreateAuction;

