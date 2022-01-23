import React from 'react';

const VehicleInfo = ({ pin }) => {
  const {
    availability,
    batteryLevel,
    platesNumber,
  } = pin.properties.details;

  return (
    <div>
      <h2>{pin.propertiesobjectName}</h2>
      <ul>
        <li><span>Status:</span> {availability === 'AVAILABLE' ? 'Dostępny' : 'Niedostępny'}</li>
        <li><span>Poziom baterii:</span> {batteryLevel}%</li>
        <li><span>Numer rejestracyjny:</span> {platesNumber}</li>
      </ul>
    </div>
  );
}

export default VehicleInfo;