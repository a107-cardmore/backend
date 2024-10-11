import { css } from "@emotion/css";
function SquareButton({ name, onClick, marginTop }) {
  return (
    <button
      className={css`
        background-color: black;
        border-radius: 0.6rem;
        color: white;
        border: none;
        width: 50%;
        height: 2.6rem;
        font-size: 1rem;
        font-weight: bold;
        box-shadow: 0 0 10px rgb(0 0 0 / 20%);
        cursor: pointer;
        &:hover {
          color: black;
          background-color: #b0ffa3;
        }
        margin-top: ${marginTop};
      `}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
export default SquareButton;
