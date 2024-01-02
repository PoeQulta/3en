// CarBox.js
import React from 'react';
import './CarBox.css';
import DatePicker from "react-datepicker";
import { useState } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
const RentHandler = (CarID,PickupDate,ReturnDate) =>
{
  const payload = {
    car:CarID,
    pickup_date:PickupDate.toISOString(),
    return_date:ReturnDate.toISOString()
  }
  axios.post("http://127.0.0.1:8000/api/reserve/",payload).then
  (response =>
    {console.log(response.data)
      window.location.href = '/reservations';
    }
  )
}
const CarBox = ({ carModel, carType, price, images, carID}) => {

  const [startDate, setStartDate] = useState(new Date());
  const [EndDate, setEndDate] = useState(new Date());
  return (
    <div className="car-box">
      <div className="car-image">
        {images && images.length > 0 && <img src={images[0].img_url} alt="Car" />}
      </div>
      <div className="car-details">
        <h3>{carModel}</h3>
        <p>Car Type: {carType}</p>
        <p>Price: {price}/day</p>
        <div>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} showTimeSelect />
        </div>
        <div>
        <DatePicker selected={EndDate} onChange={(date) => setEndDate(date)} showTimeSelect />
        </div>
        <button className="rent-button" onClick={()=>{RentHandler(carID,startDate,EndDate)}}>Rent Now</button>
      </div>
    </div>
  );
};

export default CarBox;
