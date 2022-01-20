import React from 'react';

function MarkerButton(props) {
  const { pinType } = props.pin.properties;

  if (pinType === 'vehicle') {
    return (
      <button className="marker-btn" onClick={props.clickHandler}>
        <img src="/car.png" alt="Car icon"/>
      </button>
    );
  }

  if (pinType === 'parking') {
    return (
      <button className="marker-btn" onClick={props.clickHandler}>
        <img src="/parking.png" alt="Parking icon"/>
      </button>
    );
  }

  if (pinType === 'poi') {
    return (
      <button className="marker-btn" onClick={props.clickHandler}>
        <img src="/magnifying-glass.png" alt="Magnifying glass icon"/>
      </button>
    );
  }

  return null;
}

export default MarkerButton;