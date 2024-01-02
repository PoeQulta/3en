// CarBox.js
import React from 'react';
import './CarBox.css';

const ReservationBox = ({ carModel, carType, price, images, PickupDate,ReturnDate}) => {
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
        <button className="rent-button">Return</button>
      </div>
    </div>
  );
};

export default ReservationBox;
