import React, { createContext, useState } from 'react';

export const PopupContext = createContext();

export const PopupContextProvider = ({ children }) => {
  const [selected, setSelected] = useState(null);

  return (
    <PopupContext.Provider value={{ selected, setSelected }}>
      {children}
    </PopupContext.Provider>
  );
};
