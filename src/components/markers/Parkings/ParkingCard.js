import React, { useContext } from 'react';
import { PopupContext } from '../../../context/PopupContext';

const ParkingCard = () => {
  const { selected: parking } = useContext(PopupContext);
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
        <li>
          <span>
            Dostępne miejsca parkingowe: 
          </span> {availableSpacesCount}/{totalSpaces}
        </li>
      </ul>
    </div>
  );
}

export default ParkingCard;