import React from "react";

const Footer = () => {
  return (
    <div className="fixed h-8 bottom-0 px-2 py-1 flex items-center justify-center w-full text-xs text-gray-500 ">
      <span>
        Built {" "}
        by{" "}
        <a
          href="https://lohitkolluri.tech"
          target="__blank"
          className="text-gray-700  hover:bg-red-500 hover:text-white font-medium"
        >
          Lohit Kolluri.{" "}
        </a>
      </span>
    </div>
  );
};

export default Footer;
