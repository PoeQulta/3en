// CarBox.js
import React from 'react';
import './CarBox.css';

const CarBox = ({ carModel, carType, price, plateId, yearMade, officeDetails }) => {
  return (
    <div className="car-box">
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
