import React from 'react';

import { getCarIcon } from '../getIcon.js';

const VehicleMarker = ({ vehicle }) => {
  const { vehicleType, availability } = vehicle.details;
  const { src, alt } = getCarIcon(vehicleType, availability);

  return (
    <img
      src={src}
      alt={alt}
    />
  );
}

export default VehicleMarker;