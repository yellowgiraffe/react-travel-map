import React from 'react';

function PinDescription({ object }) {
  console.log(object)
  const { objectType, objectName } = object.properties;

  if (objectType === 'vehicle') {
    const {
      availability,
      batteryLevel,
      platesNumber,
    } = object.details;
  
    return (
      <div>
        <h2>{objectName}</h2>
        <ul>
          <li><span>Status:</span> {availability === 'AVAILABLE' ? 'Dostępny' : 'Niedostępny'}</li>
          <li><span>Poziom baterii:</span> {batteryLevel}%</li>
          <li><span>Numer rejestracyjny:</span> {platesNumber}</li>
        </ul>
      </div>
    );
  }

  if (objectType === 'parking') {
    const {
      description,
      address,
      availableSpacesCount,
    } = object.details;
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

  if (objectType === 'poi') {
    const {
      description,
      category,
    } = object.details;
    return (
      <div>
        <h2>{objectName}</h2>
        <p>{description}</p>
        <ul>
          <li>Kategoria: {category}</li>
        </ul>
      </div>
    );
  }
}

export default PinDescription;
