import React, { createContext } from 'react';
import useSWR from 'swr';

// import ControlPanel from '../ControlPanel';

export const ApiDataContext = createContext();

export const ApiDataProvider = ({ children }) => {
  const url = 'https://dev.vozilla.pl/api-client-portal/map?objectType=VEHICLE&objectType=POI&objectType=PARKING';
 
  const { data, error }  = useSWR(url);
  if(!data) return <div>Loading...</div>;
  if(error) console.log(error);

  const apiData = data && !error ? data.objects : [];
  const categories = [...new Set(apiData.map((object) => object.discriminator))];

  return (
    <ApiDataContext.Provider value={{ objects: apiData, categories }}>
      {children}
    </ApiDataContext.Provider>
  );
};




// import React from 'react';
// import useSWR from 'swr';

// import ControlPanel from '../ControlPanel';


// const Data = () => {
//   const url = 'https://dev.vozilla.pl/api-client-portal/map?objectType=VEHICLE&objectType=POI&objectType=PARKING';
 
//   const { data, error }  = useSWR(url);
//   if(!data) return <div>Loading...</div>;
//   if(error) console.log(error);
//   const apiData = data && !error ? data.objects : [];

//   return (
//     <ControlPanel
//     objects={apiData}
//     categories={[...new Set(apiData.map((object) => object.discriminator))]}
//     />
//   );
// };

// export default Data;
