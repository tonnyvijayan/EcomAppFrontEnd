import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ProductContextProvider } from "./contexts/ProductContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProductContextProvider>
      <Router>
        <App />
      </Router>
    </ProductContextProvider>
  </React.StrictMode>
);
