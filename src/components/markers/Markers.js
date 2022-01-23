import React from 'react';

import VehicleMarker from './Vehicles/VehicleMarker';
import ParkingMarker from './Parkings/ParkingMarker';
import PoiMarker from './POI/PoiMarker';

const Markers = ({ object, onClick }) => {
  const { objectType } = object.properties

  return (
    <button className="marker-btn" onClick={onClick}>
      {objectType === 'vehicle' && <VehicleMarker vehicle={object} />}
      {objectType === 'parking' && <ParkingMarker parking={object} />}
      {objectType === 'poi' && <PoiMarker poi={object} />}
    </button>
  );
}

export default Markers;
