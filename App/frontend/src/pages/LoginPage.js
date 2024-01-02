import setAuthToken from "../ApiConsumptionMethods/setTokenAuth";
import axios from "axios";
import { useState } from 'react';
import './CarRentalPage.css'; // Import the CSS file
import './SearchBar.css'; // Import the SearchBar styles
import './CarSearch.css';
const handleSubmit = (username, pass) => {
  // reqres registered sample user
  const loginPayload = {
    username: username,
    password: pass
  };

  axios.post("http://127.0.0.1:8000/api/auth/", loginPayload)
    .then(response => {
      // get token from response
      const token = response.data.token;

      // set JWT token to local storage
      localStorage.setItem("token", token);

      // set token to axios common header
      setAuthToken(token);

      // redirect user to home page
      window.location.href = '/';
    })
    .catch(err => console.log(err));
};

function LoginPage() {
  const [Uservalue, setUserValue] = useState("");
  const [Passvalue, setPassValue] = useState("");

  const handleUserChange = (e) => setUserValue(e.target.value);
  const handlePassChange = (e) => setPassValue(e.target.value);

  return (

    <div>
      <p style={{"margin-top":"300px"}}></p>
      <div className="login-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Username"
        value={Uservalue} onChange={handleUserChange}
      />
      </div>
      <div className="login-bar">
      <input
        type="password"
        className="search-input"
        placeholder="Password"
        value={Passvalue} onChange={handlePassChange}
      />
      <button className="search-button" onClick={event => handleSubmit(Uservalue, Passvalue)}>
        Login
      </button>
      </div>
    </div>
    
  );
}

export default LoginPage;
