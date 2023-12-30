import React from "react";
import { Navigate, Routes, Route, Router } from "react-router-dom";
import RouteGuard from "./components/RouteGuard";
//history
import { history } from './helpers/history';
 
//pages
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
 
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );