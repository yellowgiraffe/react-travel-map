import React, { useContext, useState } from 'react';

import { ApiDataContext } from '../context/ApiDataContext';
import VehicleInfo from './Vehicles/VehicleInfo';

import VehicleMarker from './Vehicles/VehicleMarker';
import ParkingMarker from './Parkings/ParkingMarker';
import PoiMarker from './POI/PoiMarker';

const ObjectsInfo = ({ objectType }) => {
  return (
    <button className="marker-btn">
      {objectType === 'vehicle' && <VehicleMarker />}
      {objectType === 'parking' && <ParkingMarker />}
      {objectType === 'poi' && <PoiMarker />}
    </button>
  );
}

export default ObjectsInfo;