import React, { useContext, useState } from 'react';

const PoiCard = ({ poi }) => {
  const { objectName } = poi.properties;
  const {
    description,
    address,
    city,
    category,
  } = poi.details;

  console.log(address.length)
  return (
    <div className="card-content">
      <h2>{objectName}</h2>
      <h3>{description}</h3>
      <ul>
        <li><span>Kategoria:</span> {category}</li>
        <li><span>Adres:</span> {address === ' ' ? 'Nieznany' : address}</li>
        <li><span>Miasto:</span> {city}</li>
      </ul>
    </div>
  );
}

export default PoiCard;