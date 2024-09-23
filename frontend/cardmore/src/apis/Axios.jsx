import Axios from "axios";

const DHurl = "http://70.12.246.233:8080/api";
const DYurl = "http://70.12.108.65:8080/api";

const axios = Axios.create({
  baseURL: DHurl,
});

axios.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      console.log("Error : no accessToken");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
