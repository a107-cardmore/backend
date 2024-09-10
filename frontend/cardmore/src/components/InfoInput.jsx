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
          font-weight: bold;
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
          font-weight: 600;
          outline: none; 
          color: #959595;
          font-size: 0.95rem;
          &:focus{
            border-bottom: solid #B0FFA3;
          }
          &::placeholder{
            font-weight: 600;
            color: #c6c6c6;
          }
        `}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
export default InfoInput;
