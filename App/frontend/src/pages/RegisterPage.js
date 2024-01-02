import setAuthToken from "../ApiConsumptionMethods/setTokenAuth";
import axios from "axios";
import { useState } from 'react';
import './CarRentalPage.css'; // Import the CSS file
import './SearchBar.css'; // Import the SearchBar styles
import './CarSearch.css';
const handleSubmit = (username, pass,firstName,LastName,email,DLNvalue,StValue,Cityvalue,zipValue) => {
    //reqres registered sample user
    const RegisterPayload = {
      id:0, 
      username:username, 
      first_name:firstName, 
      last_name:LastName, 
      email: email, 
      password:pass, 
      is_active:1, 
      is_staff:0
    }
    const CustomerPayload = { 
      dln:DLNvalue, 
      fname:firstName, 
      lname:LastName, 
      street: StValue, 
      city:Cityvalue, 
      zip_code:zipValue, 
      date_joined:"2024-6-19 12:00:00"
    }
  
    axios.post("http://127.0.0.1:8000/api/register/", RegisterPayload)
      .then(response => {
        //get token from response
        const token  =  response.data.token;
  
        //set JWT token to local
        localStorage.setItem("token", token);
  
        //set token to axios common header
        setAuthToken(token);
        axios.post("http://127.0.0.1:8000/api/customer/info/", CustomerPayload).then(resp =>
        {
           //redirect user to home page
          window.location.href = '/'
        });
      })
      .catch(err => console.log(err));
  };

  function RegisterPage() {
    var username ="";
    var pass ="";
    const [Uservalue, setUserValue] = useState("");
    const [Passvalue, setPassValue] = useState("");
    const [FirstNamevalue, setFirstNamevalue] = useState("");
    const [LastNamevalue, setLastNamevalue] = useState("");
    const [emailvalue, setemailvalue] = useState("");
    const [DLNvalue, seteDLNvalue] = useState("");
    const [StValue, seteSTValue] = useState("");
    const [Cityvalue, setCityValue] = useState("");
    const [zipValue, seteZipValue] = useState("");


  


    return (
      <div>
        <h1>Register Page</h1>
        <div className="login-bar">
        <input placeholder="UserName" className="search-input" type="text" value={Uservalue} onChange={e => setUserValue(e.target.value)}/>
        </div>
        <div className="login-bar">
        <input placeholder="Password" className="search-input" type="password" value={Passvalue} onChange={e => setPassValue(e.target.value)}/>
        </div>
        <div className="login-bar">
        <input placeholder="First Name" className="search-input" type="text" value={FirstNamevalue} onChange={e => setFirstNamevalue(e.target.value)}/>
        </div>
        <div className="login-bar">
        <input placeholder="Last Name" className="search-input" type="text" value={LastNamevalue} onChange={e => setLastNamevalue(e.target.value)}/>
        </div>
        <div className="login-bar">
        <input placeholder="Email" className="search-input" type="email" value={emailvalue} onChange={e => setemailvalue(e.target.value)}/>
        </div>
        <div className="login-bar">
        <input placeholder="DLN" className="search-input" type="text" value={DLNvalue} onChange={e => seteDLNvalue(e.target.value)}/>
        </div>
        <div className="login-bar">
        <input placeholder="Street" className="search-input" type="text" value={StValue} onChange={e => seteSTValue(e.target.value)}/>
        </div>
        <div className="login-bar">
        <input placeholder="City" className="search-input" type="text" value={Cityvalue} onChange={e => setCityValue(e.target.value)}/>
        </div>
        <div className="login-bar">
        <input placeholder="Zip Code" className="search-input" type="text" value={zipValue} onChange={e => seteZipValue(e.target.value)}/>
        </div>
        <button className="search-button" onClick={event => handleSubmit(Uservalue,Passvalue,FirstNamevalue,LastNamevalue,emailvalue,DLNvalue,StValue,Cityvalue,zipValue)}>Register</button>
      </div>
    );
 }
 
 export default RegisterPage;