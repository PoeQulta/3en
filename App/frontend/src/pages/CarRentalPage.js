import setAuthToken from "../ApiConsumptionMethods/setTokenAuth";
import LogoutUser from "../ApiConsumptionMethods/Logout";
import axios from "axios";
import { useState } from 'react';
import './CarRentalPage.css'; // Import the CSS file
import CarBox from './CarBox';
import CarSearch from './CarSearch';
import CarSearchModal from './AdvancedSearch'
// CarRentalPage.js
  const carDataTemp = [
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
  const SearchHandler = (setData,text) =>
  {
    axios.get("http://127.0.0.1:8000/api/cars/search/",{ params: {model__contains: text} }).then
    ( response => 
      {
        setData(cardata => ([...response.data]));
      }

    )
  }
  const CarRentalPage = () => {
    const handleSearch = () => {
      console.log('Searching for cars...');
    };
    const [CarData, setCarDataValue] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="car-rental-container">
        <div className="header">
          <button className="search-button" onClick={() => {LogoutUser()}}>Logout</button>
          <button className="search-button" onClick={() => {window.location.href = '/reservations'}}>Reservations</button>
        </div>
        <h1> 3en Car Rental</h1>
        <CarSearch content={<CarSearchModal setCar={setCarDataValue} isOpen={isOpen} setIsOpen={setIsOpen} />} onSearch={(text) => {SearchHandler(setCarDataValue,text)}} />
        <div className="car-list">
          {CarData.map((car, index) => (
            <CarBox
              key={index}
              carModel={car.model}
              carType={car.car_type}
              price={car.rate}
              plateId={car.plate_id}
              yearMade={car.year_made}
              officeDetails={car.office}
              images={car.images}
              carID ={car.plate_id}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default CarRentalPage;