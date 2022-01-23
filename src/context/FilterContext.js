import React, { createContext, useContext, useEffect, useState } from 'react';

import { ApiDataContext } from './ApiDataContext';

export const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {
  const { objects, vehicles, poi, categories } = useContext(ApiDataContext);
  const [checked, setChecked] = useState([
    ...categories,
    'places',
    'trainStations',
    'gnomes'
  ]);
  const [filtered, setFiltered] = useState(objects.filter((object) => (
    checked.includes(object.discriminator)
  )));

  const availableVehicles = vehicles.filter((vehicle) => vehicle.status === 'AVAILABLE');
  const places = poi.filter((station) => station.category === 'Ciekawe miejsca');
  const trainStations = poi.filter((station) => station.category === 'Stacje kolejowe');
  const gnomes = poi.filter((gnome) => gnome.category === 'Krasnale');

  useEffect(() =>{
    setFiltered(objects.filter((object) => checked.includes(object.discriminator)));
  }, [objects, checked]);

  const checkboxCategoryHandler = (event) => {
    const checkboxValue = event.target.value
    const isCheckedCategory = checked.find((category) => category === checkboxValue);

    if (isCheckedCategory) {
      setChecked(checked.filter((category) => category !== checkboxValue));
    } else {
      setChecked([...checked, checkboxValue]);
    }
  };

  return (
    <FilterContext.Provider value={{
      filtered,
      checked,
      checkboxCategoryHandler}}>
      {children}
    </FilterContext.Provider>
  );
}


// CATEGORIES
//// VEHICLE
//////// AVAILABLE
//// PARKINGS
//////// EMPTY PLACES
//// POI
//////// CIEKAWE MIEJSCA
//////// STACJE KOLEJOWE
//////// KRASNALE
