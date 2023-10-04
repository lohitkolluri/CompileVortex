import React from "react";
import { classnames } from "../utils/general";

const CustomInput = ({ customInput, setCustomInput }) => {
  const handleChange = (e) => {
    setCustomInput(e.target.value);
  };

  const inputStyles = {
    backgroundColor: "#181A1B",
  };

  const inputClasses = classnames(
    "focus:outline-none w-full border-2 border-gray-300 z-10 rounded-md shadow-md px-4 py-2 hover:shadow-lg transition duration-200 mt-2",
    "bg-white"
  );

  return (
    <textarea
      rows="5"
      value={customInput}
      onChange={handleChange}
      placeholder="Custom input"
      className={inputClasses}
      style={inputStyles}
    ></textarea>
  );
};

export default CustomInput;
