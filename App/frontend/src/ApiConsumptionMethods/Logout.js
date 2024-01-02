import axios from 'axios';
 
const LogoutUser = token => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    window.location.href = '/';
  }
export default LogoutUser;