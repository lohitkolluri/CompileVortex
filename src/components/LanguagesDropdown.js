import React from "react";
import Select from "react-select";
import { customStyles } from "../constants/customStyles";
import { languageOptions } from "../constants/languageOptions";

const LanguagesDropdown = ({ onSelectChange }) => {
  const defaultLanguage = languageOptions[0];

  const handleSelectChange = (selectedOption) => {
    onSelectChange(selectedOption);
  };

  return (
    <Select
      placeholder="Filter By Category"
      options={languageOptions}
      styles={customStyles}
      defaultValue={defaultLanguage}
      onChange={handleSelectChange}
    />
  );
};

export default LanguagesDropdown;
