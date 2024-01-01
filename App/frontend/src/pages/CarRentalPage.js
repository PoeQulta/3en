import setAuthToken from "../ApiConsumptionMethods/setTokenAuth";
import axios from "axios";
import { useState } from 'react';
import './CarRentalPage.css'; // Import the CSS file
import CarBox from './CarBox';
import SearchBar from './SearchBar';
// CarRentalPage.js


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
      }
    }
  ];
  
  const CarRentalPage = () => {
    const handleSearch = () => {
      // Add search functionality here
      console.log('Searching for cars...');
    };
  
    return (
      <div className="car-rental-container">
        <h1 className="header">Car Rental Page</h1>
        <SearchBar onSearch={handleSearch} />
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
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default CarRentalPage;