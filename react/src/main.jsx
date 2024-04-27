import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {RouterProvider} from "react-router-dom";
import { StrictMode } from 'react';
import router from "./router.jsx";
import {ContextProvider} from "./context/contextProvider";

ReactDOM.createRoot(document.getElementById('root')).render(
    // <StrictMode>
      <ContextProvider>
          <RouterProvider router={router} />
      </ContextProvider>
    // </StrictMode>
)
