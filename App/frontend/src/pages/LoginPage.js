import setAuthToken from "../ApiConsumptionMethods/setTokenAuth";
import axios from "axios";
const handleSubmit = (username, pass) => {
    //reqres registered sample user
    const loginPayload = {
      username: 'Test',
      password: 'aloo'
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
    return (
      <div>
        <p>Login Page</p>
        <button onClick={handleSubmit}>Login</button>
      </div>
    );
 }
 
 export default LoginPage;