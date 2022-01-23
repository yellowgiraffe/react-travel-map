import React from 'react';

import { getParkingIcon } from '../getIcon.js';

const ParkingMarker = () => {
  const { src, alt } = getParkingIcon();

  return (
    <img
      src={src}
      alt={alt}
    />
  );
}

export default ParkingMarker;