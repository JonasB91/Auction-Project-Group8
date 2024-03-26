import React from 'react';

const DeleteButton = ({ auctionId, onDelete }) => {
  const handleDeleteClick = () => {
    const confirmDelete = window.confirm('Är du säker på att du vill radera auktionen?');

    if (confirmDelete) {
      onDelete(auctionId);
    }
  };

  return (
    <button onClick={handleDeleteClick}>Delete</button>
  );
};

export default DeleteButton;

