import React from "react";

const Footer = () => {
  return (
    <div className="fixed h-8 bottom-0 px-2 py-1 flex items-center justify-center w-full text-xs text-white bg-[#1e293b]">
      Built with{" "}
      <span role="img" aria-label="heart" className="mx-1">
        ❤️
      </span>
      by{" "}
      <a
        href="https://lohitkolluri.tech"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 font-medium hover:underline"
      >
        Lohit Kolluri
      </a>
    </div>
  );
};

export default Footer;
