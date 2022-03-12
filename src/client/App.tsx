import React, { StrictMode } from "react";
import { Link, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { ServerDataProvider } from "./serverData";

interface Props {
  /** Data used in the react prerender process. Use only in the server side. */
  serverData?: unknown;
}

/** The root react component for both client side rendering and server side rendering */
export default function App(props: Props) {
  return (
    <ServerDataProvider value={props ? props.serverData : null}>
      <div className="sidebar">
        <Link to="/">Home</Link>
      </div>

      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </ServerDataProvider>
  );
}
