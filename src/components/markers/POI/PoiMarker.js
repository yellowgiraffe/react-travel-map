import React from 'react';

import { getPoiIcon } from '../getIcon.js';

const PoiMarker = ({ poi }) => {
  const { category } = poi.details;
  const {
    src, alt, width, height,
  } = getPoiIcon(category);

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

export default PoiMarker;
