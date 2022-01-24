import React, { useContext } from 'react';

import { PopupContext } from '../../../context/PopupContext';

const PoiCard = () => {
  const { selected: poi } = useContext(PopupContext);
  const { objectName } = poi.properties;
  const {
    description,
    address,
    city,
    category,
  } = poi.details;

  return (
    <div className="card-content">
      <h2>{objectName}</h2>
      <h3>{description}</h3>
      <ul>
        <li>
          <span>Kategoria:</span>
          {' '}
          {category}
        </li>
        <li>
          <span>Adres:</span>
          {' '}
          {address === ' ' ? 'Nieznany' : address}
        </li>
        <li>
          <span>Miasto:</span>
          {' '}
          {city}
        </li>
      </ul>
    </div>
  );
};

export default PoiCard;
