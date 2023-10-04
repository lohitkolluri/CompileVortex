import React from "react";
import Select from "react-select";
import monacoThemes from "monaco-themes/themes/themelist";
import { customStyles } from "../constants/customStyles";

const ThemeDropdown = ({ handleThemeChange, theme }) => {
  const themeOptions = Object.entries(monacoThemes).map(([themeId, themeName]) => ({
    label: themeName,
    value: themeId,
    key: themeId,
  }));

  return (
    <Select
      placeholder="Select Theme"
      options={themeOptions}
      value={theme}
      styles={customStyles}
      onChange={handleThemeChange}
    />
  );
};

export default ThemeDropdown;
