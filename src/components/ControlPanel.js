import React, { useContext } from 'react';

import { FilterContext } from '../context/FilterContext';

const ControlPanel = () => {
  const {
    filtered,
    checked,
    checkedAllPoi,
    availableVehicles,
    checkboxHandler,
    poiAllHandler,
    availableVehiclesHandler
  } = useContext(FilterContext);


  return (
    <div className='control-panel'>
      <h2>Filtruj kategorie</h2>
      <p>Wybierz które kategorie chcesz wyświetlić na mapie</p>
      <p>Wyników: {filtered.length}</p>
      <ul className="control-panel__list">
        <li key="vehicles" className="control-panel__category">
            <label>
              <input
                type="checkbox"
                value="vehicles"
                checked={checked.vehicles}
                onChange={checkboxHandler}
              />
              Samochody
            </label>
            <ul className="control-panel__inner-list">
              <li key="availableVehicles" className="control-panel__sub-category">
                <label>
                  <input
                    type="checkbox"
                    value="availableVehicles"
                    checked={availableVehicles}
                    onChange={availableVehiclesHandler}
                  />
                  Tylko dostepne auta
                </label>
              </li>
            </ul>
          </li>
          <li key="parkings" className="control-panel__category">
            <label>
              <input
                type="checkbox"
                value="parkings"
                checked={checked.parkings}
                onChange={checkboxHandler}
              />
              Parkings
            </label>
          </li>
          <li key="poi" className="control-panel__category">
            <label>
              <input
                type="checkbox"
                value="poi"
                checked={checkedAllPoi}
                onChange={poiAllHandler}
              />
              Atrakcje turystyczne
            </label>
            <ul className="control-panel__inner-list">
              <li key="places" className="control-panel__sub-category">
                <label>
                  <input
                    type="checkbox"
                    value="places"
                    checked={checked.places}
                    onChange={checkboxHandler}
                  />
                  Ciekawe miejsca
                </label>
              </li>
              <li key="trainStations" className="control-panel__sub-category">
                <label>
                  <input
                    type="checkbox"
                    value="trainStations"
                    checked={checked.trainStations}
                    onChange={checkboxHandler}
                  />
                  Stacje kolejowe
                </label>
              </li>
              <li key ="gnomes" className="control-panel__sub-category">
                <label>
                  <input
                    type="checkbox"
                    value="gnomes"
                    checked={checked.gnomes}
                    onChange={checkboxHandler}
                  />
                  Krasnale
                </label>
              </li>
            </ul>
          </li>
      </ul>
    </div>
  );
}

export default ControlPanel;
