import { css } from "@emotion/css";

function Card({ bgColor, inColor, data }) {
  // console.log(inColor);
  return (
    <div
      className={css`
        width: 17.56rem;
        padding: 0 2rem;
        height: 13.627rem;
        border-radius: 1rem;
        background-color: ${bgColor};
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <div
        className={css`
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          border-bottom: solid 0.2rem ${inColor};
          padding: 1rem 0;
        `}
      >
        <div
          className={css`
            color: ${inColor};
            font-size: 1.5rem;
          `}
        >
          KB 국민카드
        </div>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="15.75"
            cy="15.75"
            r="14.75"
            stroke={inColor}
            stroke-width="2"
          />
          <path
            d="M7.625 15.5H23.375M23.375 15.5L15.5 7.625M23.375 15.5L15.5 23.375"
            stroke={inColor}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div
        className={css`
          color: ${inColor};
          font-size: 1.2rem;
          text-align: end;
          width: 100%;
          margin-top: 1rem;
        `}
      >
        0000 0000 0000 0000
      </div>
      <div
        className={css`
          color: ${inColor};
          font-size: 1.2rem;
          width: 100%;
          text-align: end;
          margin-top: 1.5rem;
        `}
      >
        CVC 000
      </div>
      <div
        className={css`
          color: ${inColor};
          font-size: 1.2rem;
          width: 100%;
          text-align: end;
          margin-top: 0.3rem;
        `}
      >
        End Date 09/24
      </div>
    </div>
  );
}

export default Card;
