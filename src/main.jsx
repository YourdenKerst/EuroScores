import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AppLayout from "./pages/AppLayout";
import Homepage from "./Components/Homepage";
import Matches from "./Components/Matches";
import MatchDetail from "./Components/MatchDetail";  // Importeer de MatchDetail component
import Stats from "./Components/Stats";  // Importeer de MatchDetail component
import Loading from "./Components/Loading";
import News from "./Components/News";

import "./index.css";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/euroscores",
        element: <Homepage />,
      },
      {
        path: "/matches",
        element: <Matches />,
      },
      {
        path: "/matches/:id",  
        element: <MatchDetail />,
      },
      {
        path: "/stats",  
        element: <Stats />,
      },
      {
        path: "/news",  
        element: <News />,
      },
      {
        path: "/loading",  
        element: <Loading />,
      },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
