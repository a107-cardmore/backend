import { css } from "@emotion/css";
import CardInfo from "../components/CardInfo";
import NavBar from "../components/NavBar";

function CardRecommendPage() {
  const cardInfo = [
    {
      cardName: "My WE:SH 카드",
      colorBackground: "#D3CA9F",
      colorTitle: "#844301",
      cardNo: "000000000000",
      cvc: "000",
      cardExpiryDate: "00000000",
      cardBenefits: [
        {
          categoryId: "CG-9ca85f66311a23d",
          merchantCategory: "생활",
          discountRate: 5.0,
        },
        {
          categoryId: "CG-4fa85f6425ad1d3",
          merchantCategory: "대형마트",
          discountRate: 10.0,
        },
      ],
    },
    {
      cardName: "My WE:SH 카드",
      colorBackground: "#D3CA9F",
      colorTitle: "#844301",
      cardNo: "000000000000",
      cvc: "000",
      cardExpiryDate: "00000000",
      cardBenefits: [
        {
          categoryId: "CG-9ca85f66311a23d",
          merchantCategory: "생활",
          discountRate: 5.0,
        },
        {
          categoryId: "CG-4fa85f6425ad1d3",
          merchantCategory: "대형마트",
          discountRate: 10.0,
        },
      ],
    },
    {
      cardName: "My WE:SH 카드",
      colorBackground: "#D3CA9F",
      colorTitle: "#844301",
      cardNo: "000000000000",
      cvc: "000",
      cardExpiryDate: "00000000",
      cardBenefits: [
        {
          categoryId: "CG-9ca85f66311a23d",
          merchantCategory: "생활",
          discountRate: 5.0,
        },
        {
          categoryId: "CG-4fa85f6425ad1d3",
          merchantCategory: "대형마트",
          discountRate: 10.0,
        },
      ],
    },
  ];

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
          width: 100%;
          padding-top: 2rem;
          padding-left: 4rem;
          display: flex;
          float: left;
          font-size: 2.5rem;
          font-weight: bold;
        `}
      >
        Recommends
      </div>

      <div
        className={css`
          margin: 2rem 0;
          font-size: 1.3rem;
          text-align: center;
          color: #555555;
          font-weight: 700;
        `}
      >
        당신의 소비 패턴을 기반으로
        <br />
        추천해드리는 카드입니다.
      </div>
      <div
        className={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          width: 85%;
          height: 62%;
        `}
      >
        {cardInfo.map((info, index) => (
          <CardInfo key={index} data={info} />
        ))}
        <div
          className={css`
            background-color: #b0ffa3;
            width: 100%;
            height: 7rem;
            border-radius: 0.5rem;
            padding: 0.5rem;
            box-sizing: border-box;
          `}
        >
          <div
            className={css`
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-radius: 0.4rem;
              border: solid 0.15rem #ffffff;
              padding: 0 1rem;
              box-sizing: border-box;
            `}
          >
            <div
              className={css`
                font-size: 1.4rem;
                font-weight: 800;
              `}
            >
              이번달 카드값
              <br /> 얼마 나왔어?
            </div>
            <img src="/advertise.svg" alt="" />
          </div>
        </div>
      </div>
      <NavBar isSelected={"User"} />
    </div>
  );
}

export default CardRecommendPage;
