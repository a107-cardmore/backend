import { css } from "@emotion/css";
import InfoInput from "../components/InfoInput";
import SquareButton from "../components/Button/SquareButton";
import { useNavigate } from "react-router-dom";

function SignInPage() {
  const navigate = useNavigate();
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
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          bottom: 0;
          width: 100%;
          height: 90%;
          background-color: white;
          border-top-left-radius: 2rem;
          border-top-right-radius: 2rem;
          padding: 2.5rem;
          box-sizing: border-box;
          box-shadow: 0 -4px 10px rgb(0 0 0 / 10%);
        `}
      >
        <InfoInput
          title={"Email"}
          type={"email"}
          placeholder={"email@example.com"}
        />
        <InfoInput
          title={"Password"}
          type={"password"}
          placeholder={"비밀번호 입력"}
        />
        <InfoInput
          title={"Password Check"}
          type={"password"}
          placeholder={"비밀번호 확인"}
        />
        <InfoInput title={"Name"} type={"text"} placeholder={"이름"} />
        <InfoInput title={"Nickname"} type={"text"} placeholder={"닉네임"} />
        <SquareButton
          marginTop={"3rem"}
          name={"완료"}
          onClick={() => {
            navigate("/mydata");
          }}
        />
      </div>
    </div>
  );
}
export default SignInPage;
