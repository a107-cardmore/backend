import axios from "./Axios";

export const getRecommendedCards = async () => {
  try {
    const response = axios.get("/recommends/discount").then((res) => {
      return res.data;
    });
    console.log("[IN AXIOS] get Cards", response);
    return response;
  } catch (error) {
    console.error("[IN AXIOS] get card error : ", error);
  }
};
