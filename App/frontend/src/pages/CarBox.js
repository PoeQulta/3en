// CarBox.js
import React from 'react';
import './CarBox.css';

const CarBox = ({ carModel, carType, price, plateId, yearMade, officeDetails, images }) => {
  return (
    <div className="car-box">
      <img src={images[0].img_url} alt={`Car ${carModel}`} className="car-image" />
      <h3>{carModel}</h3>
      <p>Car Type: {carType}</p>
      <p>Price: {price}/day</p>
      <p>Plate ID: {plateId}</p>
      <p>Year Made: {yearMade}</p>
      <p>Office Details: {`${officeDetails.city}, ${officeDetails.zip_code}`}</p>
      <button className="rent-button">Rent Now</button>
    </div>
  );
};

export default CarBox;
