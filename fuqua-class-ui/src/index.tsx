import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
import {
  BrowserRouter as Router,
} from "react-router-dom";
import { Mainnet, DAppProvider, Config } from "@usedapp/core";

const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]: 'https://mainnet.infura.io/v3/62687d1a985d4508b2b7a24827551934',
  },
}


ReactDOM.render(
  <React.StrictMode>
    <Router>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);