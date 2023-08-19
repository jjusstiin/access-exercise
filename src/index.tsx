import { RelayEnvironmentProvider } from "react-relay";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// theme
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
// core css
import "primereact/resources/primereact.css";
// icons
import "primeicons/primeicons.css";
// css utility
import "primeflex/primeflex.css";
import { RelayEnvironment } from "./relay/RelayEnvironment";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </RelayEnvironmentProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
