import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";
import UserProviderContext from "./context/userDataContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="bg-white">
        <ThemeProvider>
          <MaterialTailwindControllerProvider>
            <UserProviderContext>
              <App />
            </UserProviderContext>
          </MaterialTailwindControllerProvider>
        </ThemeProvider>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
