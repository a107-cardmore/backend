import Axios from "axios";

const DHurl = "http://70.12.246.233:8080/api";
const DYurl = "http://70.12.108.65:8080/api";
const url = "https://j11a107.p.ssafy.io/api";
const dyurl = "http://70.12.247.61:8080/api";

const axios = Axios.create({
  baseURL: url,
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
