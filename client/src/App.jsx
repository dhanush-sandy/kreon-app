import React from "react";
import LandingPage from "./Landing/LandingPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Dashboard/Dashbaord";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/dashbaord",
    element: <Dashboard />,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router}>
      
    </RouterProvider>
  );
};

export default App;
