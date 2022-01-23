import React from 'react';
// import useSupercluster from 'use-supercluster';
import { SWRConfig } from 'swr';
// import ReactMapGL, { Marker, Popup, FlyToInterpolator } from 'react-map-gl';


// import convertToGeojson from './utils/convertToGeojson';
import { FilterContextProvider } from './context/FilterContext';
import { ApiDataProvider } from './context/ApiDataContext';
import Map from './components/Map';
import ControlPanel from './components/ControlPanel';

import './App.css';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function App() {
  return (
    <SWRConfig value={{ revalidateOnFocus: false, fetcher }}>
          <ApiDataProvider>
            <FilterContextProvider>
              <Map />
              <ControlPanel />
            </FilterContextProvider>
          </ApiDataProvider>
    </SWRConfig>
  );
}

export default App;
