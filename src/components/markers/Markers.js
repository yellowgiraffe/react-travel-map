import React, { useContext } from 'react';

import { PopupContext } from '../../context/PopupContext';

import VehicleMarker from './Vehicles/VehicleMarker';
import ParkingMarker from './Parkings/ParkingMarker';
import PoiMarker from './POI/PoiMarker';

const Markers = ({ object }) => {
  const { setSelected } = useContext(PopupContext);
  const { objectType } = object.properties;

  const markerClickHandler = (event) => {
    event.preventDefault();
    setSelected(object);
  };

  return (
    <button type="button" className="marker-btn" onClick={markerClickHandler}>
      {objectType === 'vehicle' && <VehicleMarker vehicle={object} />}
      {objectType === 'parking' && <ParkingMarker parking={object} />}
      {objectType === 'poi' && <PoiMarker poi={object} />}
    </button>
  );
};

export default Markers;
