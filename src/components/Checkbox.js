import React, { useContext } from 'react';

import { ApiDataContext } from '../context/ApiDataContext';
import { FilterContext } from '../context/FilterContext';

const Checkbox = () => {
  const { categories } = useContext(ApiDataContext);
  const { filtered, checked, checkboxClickHandler } = useContext(FilterContext);
  
}

export default Checkbox;


// const { carsCheckboxHandler } = useContext(CheckboxContext);
//   return (
//     <li key={category}>
//       <label>
//         <input
//           type="checkbox"
//           value={category}
//           checked={checked.includes(category)}
//           onChange={checkboxClickHandler}
//         />
//         {category}
//       </label>
//       <ul className="control-panel__nested-list">
//         <li><label><input type="checkbox"/>Pokaż tylko dostępne</label></li>
//         <li><input type="checkbox"/></li>
//       </ul>
//     </li>
//   );