import React from "react";
import { classnames } from "../utils/general";

const CustomInput = ({ customInput, setCustomInput }) => {
  const handleChange = (e) => {
    setCustomInput(e.target.value);
  };

  const inputStyles = {
    backgroundColor: "#181A1B", // Dark background color
    border: "2px solid #D1D5DB",
    borderRadius: "0.375rem", // Use rem for better scalability
    boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05), 0 1px 3px 1px rgba(0, 0, 0, 0.1)",
    padding: "0.5rem 1rem",
    outline: "none",
    transition: "box-shadow 0.2s ease-in-out",
    marginTop: "0.5rem",
    width: "100%", // Full width
    boxSizing: "border-box",
    color: "#e2e8f0", // Light text color
  };

  const inputClasses = classnames(
    "focus:outline-none hover:shadow-lg",
    "bg-[#1E2022]" // Dark background color
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
