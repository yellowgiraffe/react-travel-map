import React, {
  createContext, useContext, useEffect, useState,
} from 'react';

import { ApiDataContext } from './ApiDataContext';

export const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
  const { objects, categories, freeVehicles } = useContext(ApiDataContext);

  const [filtered, setFiltered] = useState(objects);
  const [checkedAllPoi, setCheckedAllPoi] = useState(true);
  const [availableVehicles, setAvailableVehicles] = useState(false);
  const [checked, setChecked] = useState({
    vehicles: true,
    parkings: true,
    places: true,
    trainStations: true,
    gnomes: true,
  });

  useEffect(() => {
    if (availableVehicles) categories.vehicles = freeVehicles;

    const newFiltered = [];
    Object.keys(checked).forEach((category) => {
      if (checked[category]) {
        newFiltered.push(...categories[category]);
      }
    });

    setFiltered(newFiltered);

    if (checked.places || checked.trainStations || checked.gnomes) {
      setCheckedAllPoi(true);
    } else {
      setCheckedAllPoi(false);
    }
  }, [checked, categories, freeVehicles, availableVehicles]);

  const checkboxHandler = (event) => {
    const checkboxValue = event.target.value;
    if (checked[checkboxValue]) {
      setChecked((prev) => ({
        ...prev,
        [checkboxValue]: false,
      }));
    } else {
      setChecked((prev) => ({
        ...prev,
        [checkboxValue]: true,
      }));
    }
  };

  const poiAllHandler = () => {
    if (checkedAllPoi) {
      setChecked((prev) => ({
        ...prev,
        places: false,
        trainStations: false,
        gnomes: false,
      }));
      setCheckedAllPoi(false);
    } else {
      setChecked((prev) => ({
        ...prev,
        places: true,
        trainStations: true,
        gnomes: true,
      }));
      setCheckedAllPoi(true);
    }
  };

  const availableVehiclesHandler = () => {
    if (availableVehicles) { setAvailableVehicles(false); } else { setAvailableVehicles(true); }
  };

  return (
    <FilterContext.Provider value={{
      filtered,
      checked,
      checkedAllPoi,
      availableVehicles,
      checkboxHandler,
      poiAllHandler,
      availableVehiclesHandler,
    }}
    >
      {children}
    </FilterContext.Provider>
  );
};
