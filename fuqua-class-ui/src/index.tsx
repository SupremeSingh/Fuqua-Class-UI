import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { DAppProvider } from "@usedapp/core";


ReactDOM.render(
  <React.StrictMode>
    <Router>
    <DAppProvider config={{}}>
      <App />
    </DAppProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);