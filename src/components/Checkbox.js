import React, { useContext } from 'react';
import { CheckboxContext } from '../App';

const Checkbox = (props) => {
  const { carsCheckboxHandler } = useContext(CheckboxContext);
  return (
    <div>
      <input
        type="checkbox"
        id={props.id}
        onChange={carsCheckboxHandler}
        checked={props.checked}
        value={props.value}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
}

export default Checkbox;
