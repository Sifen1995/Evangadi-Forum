import axios from "axios";
const instance = axios.create({
  // version of localhost

  // baseURL: "http://localhost:2000/api",

  // deployed version of Evangadi server in Render.com
    baseURL: "https://evangadi-forum-backend-mcyd.onrender.com/api",
});
export default instance;
