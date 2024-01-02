import setAuthToken from "../ApiConsumptionMethods/setTokenAuth";
import LogoutUser from "../ApiConsumptionMethods/Logout";
import axios from "axios";
import { useState, useEffect } from 'react';
import './CarRentalPage.css'; // Import the CSS file
import ReservationBox from './ReservationBox';
import CarSearch from './CarSearch';
import CarSearchModal from './AdvancedSearch'
// CarRentalPage.js
  const SearchHandler = (setData) =>
  {
    axios.get("http://127.0.0.1:8000/api/reserve/").then
    ( response => 
      {
        setData(cardata => ([...response.data]));
      }

    )
  }
  const ReservationPage = () => {
    const handleSearch = () => {
      console.log('Searching for cars...');
    };
    const [CarData, setCarDataValue] = useState([]);
    useEffect(() => {SearchHandler(setCarDataValue)},[])
    return (
      <div className="car-rental-container">
        <div className="header">
          <button className="search-button" onClick={() => {LogoutUser()}}>Logout</button>
          <button className="search-button" onClick={() => {window.location.href = '/'}}>Home</button>
        </div>
        <h1> 3en Car Rental</h1>
        <div className="car-list">
          {CarData.map((resv, index) => (
            <ReservationBox
              key={index}
              carModel={resv.car.model}
              carType={resv.car.car_type}
              price={resv.car.rate}
              plateId={resv.car.plate_id}
              yearMade={resv.car.year_made}
              officeDetails={resv.car.office}
              images={resv.car.images}
              PickupDate={resv.pickup_date}
              ReturnDate={resv.return_date}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default ReservationPage;