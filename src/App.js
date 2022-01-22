import React, { useState, useRef, createContext } from 'react';
// import useSupercluster from 'use-supercluster';
import useSWR, { SWRConfig } from 'swr';
// import ReactMapGL, { Marker, Popup, FlyToInterpolator } from 'react-map-gl';


// import convertToGeojson from './utils/convertToGeojson';
import { FilterContextProvider } from './context/FilterContext';
import { ApiDataProvider } from './context/ApiDataContext';
import Map from './Map';
import ControlPanel from './ControlPanel';
// import PinDescription from './PinDescription';
// import MarkerButton from './MarkerButton';

import './App.css';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function App() {
  // const [viewport, setViewport] = useState({
  //   latitude: 52.114503,
  //   longitude: 19.423561,
  //   zoom: 6,
  //   width: '100vw',
  //   height: '100vh',
  // });
  // const [selectedPin, setSelectedPin] = useState(null);

  // const mapRef = useRef();

  // function reducer(pinCategories, action) {
  //   switch (action.type) {
  //     case 'vehicle':
  //       pinCategories.vehicle = !pinCategories.vehicle;
  //       break;
  //     case 'parking':
  //       pinCategories.parking = !pinCategories.parking;
  //       break;
  //     case 'poi':
  //       pinCategories.poi = !pinCategories.poi;
  //       break;
  //     default:
  //       return pinCategories;
  //   }
  //   return pinCategories;
  // }
  
  // const [pinCategories, setPinCategories] = useReducer(reducer, {
  //   vehicle: true,
  //   parking: false,
  //   poi: true,
  // });

  // const carsHandler = () => {
  //   setVisibleCars(prevVisibleCars => !prevVisibleCars);
  // }

  // const [visibleCars, setVisibleCars] = useState(true);
  // const [visibleParkings, setVisibleParkings] = useState(true);
  // const [visiblePoi, setVisiblePoi] = useState(true);



  // const url = 'https://dev.vozilla.pl/api-client-portal/map?objectType=VEHICLE&objectType=POI&objectType=PARKING';
  // const fetcher = (...args) => fetch(...args).then((res) => res.json());

  // const { data, error }  = useSWR(url, fetcher);
  // const apiData = data && !error ? data.objects : [];
  // const categories = convertToGeojson(apiData);
  

  // const bounds = mapRef.current
  //   ? mapRef.current
  //       .getMap()
  //       .getBounds()
  //       .toArray()
  //       .flat()
  //   : null;

  // const filterCategories = (categories) => {
  //   let filtered = [];
  //   if (visibleCars) {
  //     filtered = [...filtered, ...categories.vehicles];
  //   }

  //   if (visibleParkings) {
  //     filtered = [...filtered, ...categories.parkings];
  //   }

  //   if (visiblePoi) {
  //     filtered = [...filtered, ...categories.poi];
  //   }

  //   return filtered;
  // }

  // const filtered = filterCategories(categories);
  // console.log(filtered)

  // const { clusters, supercluster } = useSupercluster({
  //   points: filtered,
  //   bounds,
  //   zoom: viewport.zoom,
  //   options: { radius: 75, maxZoom: 20 },
  // });

  // const checkboxClickHandler = () => {
  //   setVisibleCars((prevVisibleCars) => {
  //     return !prevVisibleCars});
  // };

  // return (
  //   <SWRConfig value={{ revalidateOnFocus: false, fetcher }}>
  //       <CheckboxProvider>
  //         <Data />
  //         {/* <Map /> */}
  //           {/* <ControlPanel /> */}
  //       </CheckboxProvider>
  //   </SWRConfig>
  return (
    <SWRConfig value={{ revalidateOnFocus: false, fetcher }}>
          <ApiDataProvider>
            <FilterContextProvider>
              <Map />
              <ControlPanel />
            </FilterContextProvider>
          </ApiDataProvider>
          {/* <Map /> */}
            {/* <ControlPanel /> */}
    </SWRConfig>
  );
}

export default App;
