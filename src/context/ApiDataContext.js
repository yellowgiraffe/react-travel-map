import React, { createContext } from 'react';
import useSWR from 'swr';

export const ApiDataContext = createContext();

export const ApiDataProvider = ({ children }) => {
  const url = 'https://dev.vozilla.pl/api-client-portal/map?objectType=VEHICLE&objectType=POI&objectType=PARKING';
 
  const { data, error }  = useSWR(url);
  if(!data) return <div>Loading...</div>;
  if(!data) return null;
  if(error) console.log(error);

  const apiData = data && !error ? data.objects : [];

  const vehicles = apiData.filter((object) => object.discriminator === 'vehicle');
  const freeVehicles = vehicles.filter((vehicle) => vehicle.status === 'AVAILABLE');
  const parkings = apiData.filter((object) => object.discriminator === 'parking');
  const poi = apiData.filter((object) => object.discriminator === 'poi');
  const places = poi.filter((station) => station.category === 'Ciekawe miejsca');
  const trainStations = poi.filter((station) => station.category === 'Stacje kolejowe');
  const gnomes = poi.filter((gnome) => gnome.category === 'Krasnale');

  const categories = {
    vehicles,
    parkings,
    places,
    trainStations,
    gnomes,
  }
  
  return (
    <ApiDataContext.Provider value={{
      objects: apiData,
      categories,
      freeVehicles,
    }}>
      {children}
    </ApiDataContext.Provider>
  );
};
