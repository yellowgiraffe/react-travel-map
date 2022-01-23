import React, { useContext } from 'react';
// import { ApiDataContext } from '../context/ApiDataContext';
import { FilterContext } from '../context/FilterContext';

const ControlPanel = () => {

  // const { categories } = useContext(ApiDataContext);
  const { filtered, checked, checkboxCategoryHandler } = useContext(FilterContext);


  return (
    <div className='control-panel'>
      <h2>Filtruj kategorie</h2>
      <p>Wybierz które kategorie chcesz wyświetlić na mapie</p>
      <p>Wyników: {filtered.length}</p>
      <ul className="control-panel__list">
        {/* <Checkbox /> */}
        <li key="vehicles">
            <label>
              <input
                type="checkbox"
                value="vehicle"
                category="vehicle"
                checked={checked.includes('vehicle')}
                onChange={checkboxCategoryHandler}
              />
              Samochody
            </label>
            <ul>
              <li>
              <label>
              <input
                type="checkbox"
                value="vehicle"
                category="vehicle"
                filter="availableVehicles"
                checked={checked.includes('availableVehicles')}
                onChange={() => {}}
              />
              Tylko dostepne auta
            </label>
              </li>
            </ul>
          </li>
          <li key="parkings">
            <label>
              <input
                type="checkbox"
                value="parking"
                category="parking"
                checked={checked.includes('parking')}
                onChange={checkboxCategoryHandler}
              />
              Parkings
            </label>
          </li>
          <li key="poi">
            <label>
              <input
                className="category"
                type="checkbox"
                value="poi"
                category="poi"
                checked={checked.includes('poi')}
                onChange={checkboxCategoryHandler}
              />
              Points of interest
            </label>
            <ul>
              <li>
                <label>
                  <input
                    className="sub-category"
                    type="checkbox"
                    value="places"
                    category="poi"
                    filter="places"
                    checked={checked.includes('places')}
                    onChange={() => {}}
                  />
                  Ciekawe miejsca
                </label>
              </li>
              <li>
                <label>
                  <input
                    className="sub-category"
                    type="checkbox"
                    value="poi"
                    category="poi"
                    filter="trainStations"
                    checked={checked.includes('trainStations')}
                    onChange={() => {}}
                  />
                  Stacje kolejowe
                </label>
              </li>
              <li>
                <label>
                  <input
                    className="sub-category"
                    type="checkbox"
                    value="poi"
                    category="poi"
                    filter="gnomes"
                    checked={checked.includes('gnomes')}
                    onChange={() => {}}
                  />
                  Krasnale
                </label>
              </li>
              
            </ul>
          </li>

        {/* {categories && categories.map((category) => (
          <li key={category}>
            <label>
              <input
                type="checkbox"
                value={category}
                checked={checked.includes(category)}
                onChange={checkboxClickHandler}
              />
              {category}
            </label>
          </li>
        ))} */}
      </ul>
    </div>
  );
}

export default ControlPanel;


 // <div className='control-panel'>
    //   <h3>Filtruj kategorie</h3>
    //   <p>Wybierz które kategorie chcesz wyświetlić na mapie</p>
    //   <p>Wyników: {filtered.length}</p>
    //   <ul className="control-panel__list">
    //     {categories && categories.map((category) => (
          // <li key={category}>
          //   <label>
          //     <input
          //       type="checkbox"
          //       value={category}
          //       checked={checked.includes(category)}
          //       onChange={checkboxClickHandler}
          //     />
          //     {category}
          //   </label>
          //   <ul className="control-panel__nested-list">
          //     <li><label><input type="checkbox"/>Pokaż tylko dostępne</label></li>
          //     <li><input type="checkbox"/></li>
          //   </ul>
          // </li>
      //   ))}
      // </ul>



      /* <Checkbox
        key="cars"
        id="cars-checkbox"
        onChange={props.clickHandler}
        checked={props.cars}
        props="vehicle"
        label="Cars"
      />
      <Checkbox
        key="parkings"
        id="parkings-checkbox"
        onChange={props.clickHandler}
        checked={props.parkings}
        props="parking"
        label="Parkings"
      />
      <Checkbox
        key="poi"
        id="poi-checkbox"
        onChange={props.clickHandler}
        checked={props.pois}
        props="poi"
        label="Poins of interest"
      // /> */
    // </div>
