import setAuthToken from "../ApiConsumptionMethods/setTokenAuth";
import axios from "axios";
import { useState } from 'react';
import './CarRentalPage.css'; // Import the CSS file
import CarBox from './CarBox';
import CarSearch from './CarSearch';
// CarRentalPage.js


// Button component defined within CarRentalPage.js
const Button = ({ label }) => (
    <button className="custom-button">
      {label}
    </button>
  );
  
  const carData = [
    {
      "plate_id": "123",
      "car_type": "SUV",
      "model": "Tesla X",
      "year_made": 2024,
      "color": "black",
      "rate": "123.00",
      "office": {
        "office_id": 1,
        "city": "Alex",
        "zip_code": 123456
      },
      "images": [
        {
          "img_url": "https://CarImage/dsdda/fdfsidjf.pnh"
        }
      ]
    }
  ];
  
  const CarRentalPage = () => {
    const handleSearch = () => {
      console.log('Searching for cars...');
    };
  
    return (
      <div className="car-rental-container">
        <div className="header">
          <Button label="Login" />
          <Button label="Signup" />
        </div>
        <h1>Car Rental Page</h1>
        <CarSearch onSearch={handleSearch} />
        <div className="car-list">
          {carData.map((car, index) => (
            <CarBox
              key={index}
              carModel={car.model}
              carType={car.car_type}
              price={car.rate}
              plateId={car.plate_id}
              yearMade={car.year_made}
              officeDetails={car.office}
              images={car.images}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default CarRentalPage;