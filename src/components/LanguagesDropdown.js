import React from "react";
import Select from "react-select";
import { customStyles } from "../constants/customStyles";
import { languageOptions } from "../constants/languageOptions";

const LanguagesDropdown = ({ onSelectChange }) => (
  <Select
    placeholder={`Filter By Category`}
    options={languageOptions}
    styles={customStyles}
    defaultValue={languageOptions[0]}
    onChange={(selectedOption) => onSelectChange(selectedOption)}
  />
);

export default LanguagesDropdown;
