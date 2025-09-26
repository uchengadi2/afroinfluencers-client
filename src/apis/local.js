import axios from "axios";

export default axios.create({
  //baseURL: "http://localhost:9900/api/v1", //for the localhost
  baseURL: "https://api.ngadi.com.ng/api/v1", // for production
});
