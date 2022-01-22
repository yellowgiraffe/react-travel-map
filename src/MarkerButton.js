import React from 'react';

function MarkerButton(props) {
  const { objectType } = props.pin.properties;

  if (objectType === 'vehicle') {
    return (
      <button className="marker-btn" onClick={props.clickHandler}>
        <img src="/car.png" alt="Car icon"/>
      </button>
    );
  }

  if (objectType === 'parking') {
    return (
      <button className="marker-btn" onClick={props.clickHandler}>
        <img src="/parking.png" alt="Parking icon"/>
      </button>
    );
  }

  if (objectType === 'poi') {
    return (
      <button className="marker-btn" onClick={props.clickHandler}>
        <img src="/magnifying-glass.png" alt="Magnifying glass icon"/>
      </button>
    );
  }

  return null;
}

export default MarkerButton;