import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { Mainnet, DAppProvider, Config, Ropsten } from "@usedapp/core";

const config: Config = {

}

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <DAppProvider config={ config }>
      <App />
    </DAppProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);