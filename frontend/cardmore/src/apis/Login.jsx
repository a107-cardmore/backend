import axios from "./Axios";

export const Login = async (form) => {
  try {
    // console.log(form);
    const response = await axios.post("/login", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    // console.log(response);
    const accessToken = response.headers.authorization.split(" ");
    if (accessToken) {
      sessionStorage.setItem("accessToken", accessToken[1]);
      return true;
    } else {
      // console.error("로그인 실패 : accessToken이 없습니다.");
      return false;
    }
  } catch (error) {
    // console.error("login failed:", error);
    return false;
  }
};

// 로그아웃
export const logout = async () => {
  sessionStorage.removeItem("accessToken");
};
