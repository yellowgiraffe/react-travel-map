import React from 'react';

function PinDescription(props) {
  const { pinType, pinName } = props.pin.properties;

  if (pinType === 'vehicle') {
    const {
      availability,
      batteryLevel,
      platesNumber,
    } = props.pin.properties.details;
  
    return (
      <div>
        <h2>{pinName}</h2>
        <ul>
          <li><span>Status:</span> {availability === 'AVAILABLE' ? 'Dostępny' : 'Niedostępny'}</li>
          <li><span>Poziom baterii:</span> {batteryLevel}%</li>
          <li><span>Numer rejestracyjny:</span> {platesNumber}</li>
        </ul>
      </div>
    );
  }

  if (pinType === 'parking') {
    const {
      description,
      address,
      availableSpacesCount,
    } = props.pin.properties.details;
    return (
      <div>
        <h2>Parking</h2>
        <p>{description}</p>
        <ul>
          <li><span>Adres parkingu:</span> {address}</li>
          <li><span>Liczba dostępnych miejsc parkingowych:</span> {availableSpacesCount}</li>
        </ul>
      </div>
    );
  }

  if (pinType === 'poi') {
    const {
      description,
      category,
    } = props.pin.properties.details;
    return (
      <div>
        <h2>{pinName}</h2>
        <p>{description}</p>
        <ul>
          <li>Kategoria: {category}</li>
        </ul>
      </div>
    );
  }
}

export default PinDescription;
