import Axios from "axios";

const dahyunurl = "http://70.12.246.233:8080/api";

export const axios = Axios.create({
  baseURL: dahyunurl,
});

axios.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("accessToke");
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
