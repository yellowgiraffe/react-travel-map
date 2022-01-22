import React, { createContext, useContext, useEffect, useState } from 'react';

import { ApiDataContext } from './ApiDataContext';

export const FilterContext = createContext();

export const FilterContextProvider = ({ children }) => {  
  const { objects, categories } = useContext(ApiDataContext);

  const [checked, setChecked] = useState(categories);
  const [filtered, setFiltered] = useState(
    objects.filter((object) => checked.includes(object.discriminator)));

  useEffect(() =>{
    setFiltered(objects.filter((object) => checked.includes(object.discriminator)))
  }, [objects, checked]);

  const checkboxClickHandler = (event) => {
    const isChecked = checked.find((category) => category === event.target.value);
    if (isChecked) {
      setChecked(checked.filter((category) => category !== event.target.value));
    } else {
      setChecked([...checked, event.target.value])
    }
  }
  return (
    <FilterContext.Provider value={{filtered, checked, checkboxClickHandler}}>
      {children}
    </FilterContext.Provider>
  );
}








































// export const CheckboxContext = createContext();

// export const CheckboxProvider = ({ children }) => {
//   const carsCheckboxHandler = () => {
//     setVisibleCars(prevVisibleCars => !prevVisibleCars);
//   }
  
//   const [visibleCars, setVisibleCars] = useState(true);
//   const [visibleParkings, setVisibleParkings] = useState(true);
//   const [visiblePoi, setVisiblePoi] = useState(true);

//   return (
//     <CheckboxContext.Provider value = {visibleCars}> 
//       {children} 
//     </CheckboxContext.Provider>
//   )
// }



// import React, { createContext, useState } from 'react';

// // export const GlobalState = createContext();

// export const GlobalProvider = ({ children }) => {
//   const [visibleCars, setVisibleCars] = useState(true);


//   const state = {
//     visibleCars: [visibleCars, setVisibleCars],
//   };

//   return (
//     <GlobalState.Provider value = {state}> 
//       {children} 
//     </GlobalState.Provider>
//   )
// }
