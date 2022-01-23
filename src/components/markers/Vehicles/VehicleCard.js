import React from 'react';

const VehicleCard = ({ vehicle }) => {
  const { objectName } = vehicle.properties;
  const {
    availability,
    batteryLevel,
    platesNumber,
    vehicleType,
  } = vehicle.details;

  return (
    <div className="card-content">
      <h2>{objectName}</h2>
      <h3>{vehicleType === 'CAR' ? 'Samochód osobowy' : 'Samochód ciężarowy'}</h3>
      <ul>
        <li><span>Status:</span> {availability === 'AVAILABLE' ? 'Dostępny' : 'Niedostępny'}</li>
        <li><span>Poziom baterii:</span> {batteryLevel}%</li>
        <li><span>Numer rejestracyjny:</span> {platesNumber}</li>
      </ul>
    </div>
  );
}

export default VehicleCard;