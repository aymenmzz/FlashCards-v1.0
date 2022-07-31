import DarkModeButton from "./DarkModeButton";
import Link from "next/link";
import styled from "styled-components";
import Menu from "./Menu";
import React from "react";

function Layout({ children, dark, toggleDark }) {

  const [hide, setHide] = React.useState(() => true);

  const toggleHide = () => setHide((prevHide) => !prevHide);

  return (
    <div style={{ height: "100%" }}>
      {hide ? (
        <>
          <div
            style={
              dark
                ? { backgroundColor: "black", color: "white", minHeight: "100%" }
                : { backgroundColor: "white",color: "black", minHeight: "100%" }
            }
          >
            <header className="header">
              <svg
                onClick={() => toggleHide()}
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 adjust-logo"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <Link href="/">
                <a>
                  <h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 adjust-logo"
                      style={{ width: 30, marginRight: 5 }}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Flash Cards
                  </h2>
                </a>
              </Link>
              <DarkModeButton dark={dark} toggleDark={() => toggleDark()} />
            </header>
            <div style={{ minHeight: "100%" }}>{children}</div>
            <footer
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "lightgray",
                paddingTop: 20,
                paddingBottom: 20,
                width: "100vw",
                color: "black",
              }}
            >
              <Link href="/annexe">
                <a className="annexe">Annexe {"(pour employeur potentiel)"}</a>
              </Link>
            </footer>
          </div>
        </>
      ) : (
        <Menu dark={dark} toggleHide={toggleHide} />
      )}
    </div>
  );
}

export default Layout;
