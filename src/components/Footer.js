import React from "react";

const Footer = () => {
  const githubLogoUrl = "https://img.icons8.com/color/48/github--v1.png";
  const websiteLogoUrl = "https://img.icons8.com/color/48/domain.png";

  const footerStyles = {
    height: "3rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#1e2022", // Dark background color
    color: "#e2e8f0", // Light text color
    display: "flex",
    alignItems: "center",
    fontSize: "0.75rem",
    borderRadius: "0.5rem",
  };

  const logoStyles = {
    width: "2.5rem",
    height: "auto",
    marginRight: "0.5rem",
  };

  return (
    <div className="fixed bottom-0 w-full flex items-center justify-center">
      <div className="flex items-center" style={footerStyles}>
        <a
          href="https://github.com/lohitkolluri"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-1"
        >
          <img src={githubLogoUrl} alt="GitHub Logo" style={logoStyles} />
        </a>
        <a
          href="https://lohitkolluri.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-1"
        >
          <img src={websiteLogoUrl} alt="Website Logo" style={logoStyles} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
