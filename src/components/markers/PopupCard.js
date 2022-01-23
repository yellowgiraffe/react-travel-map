import React, { useContext } from 'react';
import { Popup } from 'react-map-gl';

import VehicleCard from './Vehicles/VehicleCard';
import ParkingCard from './Parkings/ParkingCard';
import PoiCard from './POI/PoiCard';

import { PopupContext } from '../../context/PopupContext';

const PopupCard = () => {
  const { selected, setSelected } = useContext(PopupContext);
  const { objectType } = selected.properties;
  
  return (
    <Popup
      latitude={selected.geometry.coordinates[1]}
      longitude={selected.geometry.coordinates[0]}
      onClose={() => {
        setSelected(null);
      }}
    >
      {objectType === 'vehicle' && <VehicleCard />}
      {objectType === 'parking' && <ParkingCard />}
      {objectType === 'poi' && <PoiCard />}
    </Popup>
  );
}

export default PopupCard;