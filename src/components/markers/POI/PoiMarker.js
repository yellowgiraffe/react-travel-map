import React from 'react';

import { getPoiIcon } from '../getIcon.js';

const PoiMarker = ({ poi }) => {
  const { category } = poi.details;
  const { src, alt } = getPoiIcon(category);

  return (
    <img
      src={src}
      alt={alt}
    />
  );
}

export default PoiMarker;