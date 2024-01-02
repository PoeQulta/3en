// CarBox.js
import React from 'react';
import './CarBox.css';
import axios from "axios";
const PaymentHandler = (BillID) =>
{
  axios.post("http://127.0.0.1:8000/api/bill/pay/",{billing_num:BillID}).then
  (response =>
    {console.log(response.data)
      window.location.href = '/Bills';
    }
  )
}
const BillBox = ({ carID, price, ReturnDate, PickupDate,fully_paid, BillID}) => {
  return (
    <div className="car-box">
      <div className="car-details">
        <h3>Bill: {BillID}</h3>
        <p>Paid: {fully_paid.toString()}</p>
        <p>Car Plate ID: {carID}</p>
        <p>pickup date: {PickupDate}</p>
        <p>Return date: {ReturnDate}</p>
        <p>Amount: {((new Date(ReturnDate).getTime() - new Date(PickupDate).getTime())/(1000 * 3600 * 24))*price}</p>
        <button className="rent-button" onClick={() => {PaymentHandler(BillID)}} hidden={fully_paid}>Pay</button>
      </div>
    </div>
  );
};

export default BillBox;
