import React from 'react';

import { getCarIcon } from '../getIcon.js';

const VehicleMarker = ({ vehicle }) => {
  const { vehicleType, availability } = vehicle.details;
  const {
    src, alt, width, height,
  } = getCarIcon(vehicleType, availability);

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

export default VehicleMarker;
