import { css } from "@emotion/css";
import InfoInput from "../components/InfoInput";

function LoginPage() {
  return (
    <div
      className={css`
        position: relative;
        background-color: #f6f6f6;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100vh;
      `}
    >
      <div
        className={css`
          height: 40vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <img
          className={css`
            width: 60%;
          `}
          src="/Logo.svg"
          alt=""
        />
      </div>
      <div
        className={css`
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          bottom: 0;
          width: 100%;
          height: 55%;
          background-color: white;
          border-top-left-radius: 2rem;
          border-top-right-radius: 2rem;
          padding: 2.5rem;
          box-sizing: border-box;
          box-shadow: 0 -4px 10px rgb(0 0 0 / 10%);
        `}
      >
        <InfoInput
          title={"User Id"}
          type={"text"}
          placeholder={"아이디 입력"}
        />
        <InfoInput
          title={"Password"}
          type={"password"}
          placeholder={"비밀번호 입력"}
        />
      </div>
    </div>
  );
}

export default LoginPage;
