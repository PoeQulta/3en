// CarBox.js
import React from 'react';
import './CarBox.css';
import axios from "axios";
const ReturnHandler = (ReservationID) =>
{
  const payload = {
    due_date:new Date().toISOString(),
    fully_paid:false,
    reservation:ReservationID
  }
  axios.post("http://127.0.0.1:8000/api/car/Return/",payload).then
  (response =>
    {console.log(response.data)
      window.location.href = '/Bills';
    }
  )
}
const ReservationBox = ({ carModel, carType, price, images, PickupDate,ReturnDate, reservationID}) => {
  return (
    <div className="car-box">
      <div className="car-image">
        {images && images.length > 0 && <img src={images[0].img_url} alt="Car" />}
      </div>
      <div className="car-details">
        <h3>{carModel}</h3>
        <p>Car Type: {carType}</p>
        <p>pickup date: {PickupDate}</p>
        <p>Return date: {ReturnDate}</p>
        <p>Price: {price}/day</p>
        <button className="rent-button" onClick={()=>{ReturnHandler(reservationID)}}>Return</button>
      </div>
    </div>
  );
};

export default ReservationBox;
