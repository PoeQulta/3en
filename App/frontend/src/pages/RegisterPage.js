import setAuthToken from "../ApiConsumptionMethods/setTokenAuth";
import axios from "axios";
import { useState } from 'react';
const handleSubmit = (username, pass,firstName,LastName,email) => {
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
  
    axios.post("http://127.0.0.1:8000/api/register/", RegisterPayload)
      .then(response => {
        //get token from response
        const token  =  response.data.token;
  
        //set JWT token to local
        localStorage.setItem("token", token);
  
        //set token to axios common header
        setAuthToken(token);
  
 //redirect user to home page
        window.location.href = '/'
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


  


    return (
      <div>
        <p>Register Page</p>
        <div>
        <label>userName:</label>
        <input type="text" value={Uservalue} onChange={e => setUserValue(e.target.value)}/>
        <label>password</label>
        <input type="password" value={Passvalue} onChange={e => setPassValue(e.target.value)}/>
        <label>Fname:</label>
        <input type="text" value={FirstNamevalue} onChange={e => setFirstNamevalue(e.target.value)}/>
        <label>Lname:</label>
        <input type="text" value={LastNamevalue} onChange={e => setLastNamevalue(e.target.value)}/>
        <label>email:</label>
        <input type="text" value={emailvalue} onChange={e => setemailvalue(e.target.value)}/>
        </div>
        <button onClick={event => handleSubmit(Uservalue,Passvalue,FirstNamevalue,LastNamevalue,emailvalue)}>Register</button>
      </div>
    );
 }
 
 export default RegisterPage;