/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SelectionProvider } from "./utils/SelectionContext";
import { CurrentPathProvider } from "./utils/currentPathContext";
import { FilterProvider } from "./utils/FilterContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SelectionProvider>
      <BrowserRouter>
        <CurrentPathProvider>
          <FilterProvider>
            <App />
          </FilterProvider>
        </CurrentPathProvider>
      </BrowserRouter>
    </SelectionProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
