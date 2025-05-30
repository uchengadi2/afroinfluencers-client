import axios from "axios";

export default axios.create({
  //baseURL: "http://localhost:9900/api/v1", //for the localhost
  baseURL: "https://api.controlsoft.com.ng/api/v1", // for production
});
