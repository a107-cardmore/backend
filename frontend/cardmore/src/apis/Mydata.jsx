import axios from "./Axios";

export const getCardAll = async () => {
  try {
    const response = axios.get("/cards/all").then((res) => {
      return res.data;
    });
    console.log("[IN AXIOS] mydata get card all", response);
    return response;
  } catch (error) {
    console.error("get card all fail : ", error);
  }
};
