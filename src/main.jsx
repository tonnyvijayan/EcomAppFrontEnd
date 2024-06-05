import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ProductContextProvider } from "./contexts/ProductContextProvider.jsx";
import { AuthContextProvider } from "./contexts/AuthContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductContextProvider>
        <Router>
          <App />
        </Router>
      </ProductContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
