import React from "react";
import style from "../styles/Menu.module.css";
import Articles from "./Articles";

export default function Menu({ toggleHide, dark}) {
  return (
    <div
      style={{
        display: "flex ",
        width: "100%",
        backgroundColor: dark ? "black" : "white",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          width: "50%",
          minHeight: "100vh",
          transform: "translateX(0)",
          animation: `linear .15s ${style.animate}`,
          backgroundColor: "lightgray",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "start",
            justifyContent: "space-around",
            width: "100%",
            margin: 0,
          }}
        >
          <svg
            onClick={() => toggleHide()}
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 adjust-logo"
            id="croix"
            fill="none"
            style={{
              display: "flex",
              justifyConten: "start",
              alignItems: "start",
              marginTop: 15,
              marginLeft: 0,
            }}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          {window.outerWidth > 834 ? (
            <h2>Pourquoi utiliser des FlashCards ?</h2>
          ) : (
            <h3>Pourquoi utiliser des FlashCards ?</h3>
          )}
        </div>
        <Articles />
      </div>
      <div
        onClick={() => toggleHide()}
        style={{
          backgroundColor: "inherit",
          display: "inline-block",
          width: "50%",
        }}
      ></div>
    </div>
  );
}
