import axios from "./Axios";

export const getCards = async () => {
  try {
    const response = axios.get("/cards").then((res) => {
      return res.data;
    });
    console.log("[IN AXIOS] get Cards", response);
    return response;
  } catch (error) {
    console.error("[IN AXIOS] get card error : ", error);
  }
};
