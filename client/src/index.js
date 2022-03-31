import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import StoreProvider from "./components/StoreContext";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
