import React from 'react';

import { getParkingIcon } from '../getIcon.js';

const ParkingMarker = () => {
  const {
    src, alt, width, height,
  } = getParkingIcon();

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

export default ParkingMarker;
