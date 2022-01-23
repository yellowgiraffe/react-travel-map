import React from 'react';
import { SWRConfig } from 'swr';

import { ApiDataProvider } from './context/ApiDataContext';
import { FilterContextProvider } from './context/FilterContext';
import { PopupContextProvider } from './context/PopupContext';

import Map from './components/Map';
import ControlPanel from './components/ControlPanel';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function App() {
  return (
    <SWRConfig value={{ revalidateOnFocus: false, fetcher }}>
          <ApiDataProvider>
            <FilterContextProvider>
              <PopupContextProvider>
                <Map />
              </PopupContextProvider>
              <ControlPanel />
            </FilterContextProvider>
          </ApiDataProvider>
    </SWRConfig>
  );
}

export default App;
