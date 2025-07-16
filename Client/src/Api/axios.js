import axios from "axios";
const instance = axios.create({
    
    baseURL: "https://forum-api-deploy-20.onrender.com/api",
});
export default instance;
