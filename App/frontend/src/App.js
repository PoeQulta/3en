import logo from './logo.svg';
import './App.css';
import setAuthToken from './ApiConsumptionMethods/setTokenAuth.js'

import React from "react";
import { Navigate, Routes, Route, Router } from "react-router-dom";
import RouteGuard from "./components/RouteGuard";
//history
import { history } from './helpers/history';
 
//pages
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import CarRentalPage from './pages/CarRentalPage.js';
import ReservationsPage from './pages/ReservationsPage.js';
import BillingPage from './pages/BillsPage';
 
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RouteGuard component={CarRentalPage} />
  },
  {
    path: "/Reservations",
    element: <RouteGuard component={ReservationsPage} />
  },
  {
    path: "/Bills",
    element: <RouteGuard component={BillingPage} />
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },

]);
function App() {
  const token = localStorage.getItem("token");
  if (token) {
      setAuthToken(token);
  }
return(

  
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
}

export default App;
