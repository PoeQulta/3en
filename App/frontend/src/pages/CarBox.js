// CarBox.js
import React from 'react';
import './CarBox.css';

const CarBox = ({ carModel, carType, price, images }) => {
  return (
    <div className="car-box">
      <div className="car-image">
        {images && images.length > 0 && <img src={images[0].img_url} alt="Car" />}
      </div>
      <div className="car-details">
        <h3>{carModel}</h3>
        <p>Car Type: {carType}</p>
        <p>Price: {price}/day</p>
        <button className="rent-button">Rent Now</button>
      </div>
    </div>
  );
};

export default CarBox;
