import setAuthToken from "../ApiConsumptionMethods/setTokenAuth";
import axios from "axios";
import { useState } from 'react';
const handleSubmit = (username, pass) => {
    //reqres registered sample user
    const loginPayload = {
      username: username,
      password: pass
    }
  
    axios.post("http://127.0.0.1:8000/api/auth/", loginPayload)
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

  function LoginPage() {
    var username ="";
    var pass ="";
    const [Uservalue, setUserValue] = useState("");
    const [Passvalue, setPassValue] = useState("");

    const handleUserChange = (e) => setUserValue(e.target.value);
    const handlePassChange = (e) => setPassValue(e.target.value);

    return (
      <div>
        <p>Login Page</p>
        <input type="text" value={Uservalue} onChange={handleUserChange}/>
        <input type="password" value={Passvalue} onChange={handlePassChange}/>
        <button onClick={event => handleSubmit(Uservalue,Passvalue)}>Login</button>
      </div>
    );
 }
 
 export default LoginPage;