import { css } from "@emotion/css";
function InfoInput({ title, type, placeholder }) {
  return (
    <div
      className={css`
        padding-top: 1rem;
        width: 100%;
      `}
    >
      <div
        className={css`
          color: #959595;
          font-weight: 500;
          font-size: 1.2rem;
        `}
      >
        {title}
      </div>
      <input
        className={css`
          width: 90%;
          border: none;
          border-bottom: solid #959595;
          padding-top: 1rem;
          padding-bottom: 0.3rem;
          font-weight: 500;
          outline: none;
          color: #959595;
          font-size: 1rem;
          &:focus{
            border-bottom: solid #B0FFA3;
          }
        `}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
export default InfoInput;
