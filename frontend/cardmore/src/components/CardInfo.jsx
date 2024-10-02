import { css } from "@emotion/css";
import Card from "./Card";

function CardInfo({ data }) {
  console.log(data);
  return (
    <div
      className={css`
        background-color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 7rem;
        margin: 0.2rem;
        border-radius: 0.5rem;
        box-sizing: border-box;
      `}
    >
      <div
        className={css`
          width: 20%;
        `}
      >
        <div
          className={css`
            transform: scale(0.4);
          `}
        >
          <Card data={data} />
        </div>
      </div>
      <div
        className={css`
          display: flex;
          flex-direction: column;
          width: 45%;
          margin-right: 0.5rem;
        `}
      >
        <div
          className={css`
            font-size: 1.2rem;
            font-weight: 600;
            color: #555555;
            margin-bottom: 0.8rem;
          `}
        >
          {data.cardName}
        </div>
        <div
          className={css`
            padding: 0 1rem;
            border-left: solid 0.15rem #c6c6c6;
          `}
        >
          {data.cardBenefits.map((benefit, index) => (
            <div
              key={index}
              className={css`
                color: #555555;
                display: flex;
                width: 85%;
                justify-content: space-between;
              `}
            >
              <div>{benefit.merchantCategory}</div>
              <div>{benefit.discountRate}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default CardInfo;
