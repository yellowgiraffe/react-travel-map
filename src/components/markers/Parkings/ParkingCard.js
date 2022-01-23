import React, { useContext, useState } from 'react';

const ParkingCard = ({ parking }) => {
  const {
    description,
    address,
    availableSpacesCount,
    totalSpaces,
  } = parking.details;
  

  return (
    <div className="card-content">
      <h2>Parking</h2>
      <h3>{description}</h3>
      <ul>
        <li><span>Adres parkingu:</span> {address}</li>
        <li><span>Dostępne miejsca parkingowe:</span> {availableSpacesCount}/{totalSpaces}</li>
      </ul>
    </div>
  );
}

export default ParkingCard;