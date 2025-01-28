import React from "react";

const Navigator = ({ screen }) => {
  return (
    <a
      href="#"
      className={` animate-bounce  bottom-10 right-10 cursor-pointer   fixed transition duration-500 z-40 ${
        !screen ? "block" : "hidden"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1}
        stroke="currentColor"
        className="w-6 h-6 primary-highlighter"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18"
        />
      </svg>
    </a>
  );
};

export default Navigator;
