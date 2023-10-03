export const customStyles = {
  control: (styles) => ({
    ...styles,
    width: "100%",
    maxWidth: "14rem",
    minWidth: "12rem",
    borderRadius: "5px",
    color: "#C7C3BD",
    fontSize: "0.8rem",
    lineHeight: "1.75rem",
    backgroundColor: "#181A1B",
    cursor: "pointer",
    border: "2px solid #C7C3BD",
    boxShadow: "4x 4px 0px 0px #C7C3BD",
    ":hover": {
      border: "2px solid #8A8275",
      boxShadow: "none",
    },
  }),
  option: (styles) => {
    return {
      ...styles,
      color: "#C7C3BD",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
      width: "100%",
      background: "#181A1B",
      ":hover": {
        backgroundColor: "#C7C3BD",
        color: "#000",
        cursor: "pointer",
      },
    };
  },
  menu: (styles) => {
    return {
      ...styles,
      backgroundColor: "#C7C3BD",
      maxWidth: "14rem",
      border: "2px solid #000000",
      borderRadius: "5px",
      boxShadow: "5px 5px 0px 0px rgba(0,0,0);",
    };
  },

  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#F3F4F6",
      fontSize: "0.8rem",
      lineHeight: "1.75rem",
    };
  },
};
