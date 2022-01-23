import React, { useContext, useState } from 'react';
import { Popup } from 'react-map-gl';

import VehicleCard from './Vehicles/VehicleCard';
import ParkingCard from './Parkings/ParkingCard';
import PoiCard from './POI/PoiCard';

const PopupCard = ({ selected }) => {
  const { objectType } = selected.properties;
  
  return (
    <Popup
      latitude={selected.geometry.coordinates[1]}
      longitude={selected.geometry.coordinates[0]}
    >
      {objectType === 'vehicle' && <VehicleCard vehicle={selected} />}
      {objectType === 'parking' && <ParkingCard parking={selected} />}
      {objectType === 'poi' && <PoiCard poi={selected} />}
    </Popup>
  );
}

export default PopupCard;