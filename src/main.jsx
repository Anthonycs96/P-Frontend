import React from 'react'
import ReactDOM from 'react-dom/client'
import './public/index.css'
import "./public/SideNavBar.css";

import { router } from "./router/IndexRouter";
import { RouterProvider } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
