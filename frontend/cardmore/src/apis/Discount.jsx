import axios from "./Axios";

export const discountAll = async () => {
  try {
    const response = await axios.get("/discounts/all").then((res) => {
      console.log("[IN AXIOS] get discount all : ", res.data);
      return res.data;
    });
    return response;
  } catch (error) {}
};
