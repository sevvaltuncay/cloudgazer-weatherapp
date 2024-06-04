import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Global CSS dosyanız varsa
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { WeatherContextProvider } from "./context/WeatherContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WeatherContextProvider>
        <App />
      </WeatherContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
