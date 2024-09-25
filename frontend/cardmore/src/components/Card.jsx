import { css } from "@emotion/css";

function Card({ data, setShowModal, isSelected }) {
  const _clickArrow = () => {
    if (isSelected) {
      setShowModal(true);
    }
  };

  return (
    <div
      className={css`
        width: 17.56rem;
        padding: 0 2rem;
        height: 13.627rem;
        border-radius: 1rem;
        background-color: ${data.colorBackground};
        color: ${data.colorTitle};
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
          border-bottom: solid 0.2rem ${data.colorTitle};
          padding: 1rem 0;
        `}
      >
        <div
          className={css`
            font-size: 1.5rem;
          `}
        >
          {data.cardName}
        </div>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={_clickArrow}
        >
          <circle
            cx="15.75"
            cy="15.75"
            r="14.75"
            stroke={data.colorTitle}
            stroke-width="2"
          />
          <path
            d="M7.625 15.5H23.375M23.375 15.5L15.5 7.625M23.375 15.5L15.5 23.375"
            stroke={data.colorTitle}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div
        className={css`
          font-size: 1.2rem;
          text-align: end;
          width: 100%;
          margin-top: 1rem;
        `}
      >
        {data.cardNo.slice(0, 4)} {data.cardNo.slice(4, 8)}{" "}
        {data.cardNo.slice(8, 12)} {data.cardNo.slice(12, 16)}
      </div>
      <div
        className={css`
          font-size: 1.2rem;
          width: 100%;
          text-align: end;
          margin-top: 1.5rem;
        `}
      >
        CVC {data.cvc}
      </div>
      <div
        className={css`
          font-size: 1.2rem;
          width: 100%;
          text-align: end;
          margin-top: 0.3rem;
        `}
      >
        End Date {data.cardExpiryDate.slice(4, 6)}/
        {data.cardExpiryDate.slice(2, 4)}
      </div>
    </div>
  );
}

export default Card;
