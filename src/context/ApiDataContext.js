import React, { createContext } from 'react';
import useSWR from 'swr';

export const ApiDataContext = createContext();

export const ApiDataProvider = ({ children }) => {
  const url = 'https://dev.vozilla.pl/api-client-portal/map?objectType=VEHICLE&objectType=POI&objectType=PARKING';
 
  const { data, error }  = useSWR(url);
  // if(!data) return <div>Loading...</div>;
  if(!data) return null;
  if(error) console.log(error);

  const apiData = data && !error ? data.objects : [];
  const categories = [...new Set(apiData.map((object) => object.discriminator))];
  const vehicles = apiData.filter((object) => object.discriminator === 'vehicle');
  const parkings = apiData.filter((object) => object.discriminator === 'parking');
  const poi = apiData.filter((object) => object.discriminator === 'poi');

  return (
    <ApiDataContext.Provider value={{
      objects: apiData,
      categories,
      vehicles,
      parkings,
      poi,
    }}>
      {children}
    </ApiDataContext.Provider>
  );
};
