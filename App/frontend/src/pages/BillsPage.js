import setAuthToken from "../ApiConsumptionMethods/setTokenAuth";
import LogoutUser from "../ApiConsumptionMethods/Logout";
import axios from "axios";
import { useState, useEffect } from 'react';
import './CarRentalPage.css'; // Import the CSS file
import BillBox from './BillBox';
// CarRentalPage.js
  const SearchHandler = (setData) =>
  {
    axios.get("http://127.0.0.1:8000/api/car/Return/").then
    ( response => 
      {
        setData(cardata => ([...response.data]));
        console.log(response.data)
      }

    )
  }
  const BillingPage = () => {
    const handleSearch = () => {
      console.log('Searching for cars...');
    };
    const [CarData, setCarDataValue] = useState([]);
    useEffect(() => {SearchHandler(setCarDataValue)},[])
    return (
      <div className="car-rental-container">
        <div className="header">
          <button className="search-button" onClick={() => {LogoutUser()}}>Logout</button>
          <button className="search-button" onClick={() => {window.location.href = '/Reservations'}}>Reservations</button>
          <button className="search-button" onClick={() => {window.location.href = '/'}}>Home</button>
        </div>
        <h1> 3en Car Rental</h1>
        <div className="car-list">
          {CarData.map((bill, index) => (
            <BillBox
              key={index}
              carID={bill.reservation.car.plate_id}
              price={bill.reservation.car.rate}
              ReturnDate={bill.reservation.return_date}
              PickupDate={bill.reservation.pickup_date}
              BillID={bill.billing_num}
              fully_paid = {bill.fully_paid}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default BillingPage;