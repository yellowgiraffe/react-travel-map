import React, { useContext } from 'react';
import { ApiDataContext } from '../context/ApiDataContext';
import { FilterContext } from '../context/FilterContext';

function ControlPanel() {

  const { categories } = useContext(ApiDataContext);
  const { filtered, checked, checkboxClickHandler } = useContext(FilterContext);


  return (
    <div className='control-panel'>
      <h3>Filtruj kategorie</h3>
      <p>Wybierz które kategorie chcesz wyświetlić na mapie</p>
      <p>Wyników: {filtered.length}</p>
      {categories && categories.map((category) => (
        <div key={category}>
          <input
            type="checkbox"
            value={category}
            checked={checked.includes(category)}
            onChange={checkboxClickHandler}
          />
          {category}
        </div>
      ))}



      {/* <Checkbox
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
      /> */}
    </div>
  );
}

export default ControlPanel;

