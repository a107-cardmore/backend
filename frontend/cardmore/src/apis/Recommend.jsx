import axios from "./Axios";

export const getRecommends = async () => {
  try {
    const response = await axios.get("/recommends/new").then((res) => {
      console.log("[IN AXIOS] get card recommends : ", res.data);
      return res.data;
    });
    return response;
  } catch (error) {
    console.error("[IN AXIOS] get recommendation fail : ", error);
  }
};
