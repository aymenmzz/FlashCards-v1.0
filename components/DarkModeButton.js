import React from "react";

function DarkModeButton({ toggleDark, dark }) {
  return (
    <div
      id="dark-mode-container"
      style={
        dark
          ? { backgroundColor: "black", color: "white" }
          : { backgroundColor: "white" }
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 adjust-logo"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.7}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      <label className="switch">
        <input
          type="checkbox"
          onClick={() => toggleDark()}
          defaultChecked={dark}
        />
        <span className="slider round"></span>
      </label>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 adjust-logo"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.6}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </div>
  );
}

export default DarkModeButton;
