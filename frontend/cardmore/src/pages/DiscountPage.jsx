import { css } from "@emotion/css";
import NavBar from "../components/NavBar";
import { discountAll, discountHistory } from "../apis/Discount";
import { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js/auto";

function DiscountPage() {
  const [discount, setDiscount] = useState();
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [discountData, setDiscountData] = useState();
  const [cards, setCards] = useState();
  const chartRef = useRef(null);

  const labels = ["주유", "대형마트", "교통", "생활"];

  const getDate = () => {
    const currentDate = new Date();
    setYear(currentDate.getFullYear());
    setMonth(currentDate.getMonth());
    console.log(currentDate.getFullYear(), currentDate.getMonth());
  };

  const getDiscountInfo = async () => {
    if (year && month !== undefined) {
      const time = {
        year: year,
        month: month,
      };
      console.log(time);
      const response = await discountHistory(time).then((res) => {
        console.log(res.result);
        return res.result;
      });
      setDiscountData(response);
    }
  };

  const asdf = [
    {
      cardId: "1009508169730805",
      cardName: "원더카드 (원더 Life)",
      colorBackground: "#D8F068",
      colorTitle: "#00B451",
      merchantCategory: "MARKET",
      price: 480,
    },
    {
      cardId: "1006464439409805",
      cardName: "현대카드M",
      colorBackground: "#6BCEF5",
      colorTitle: "#014886",
      merchantCategory: "REFUELING",
      price: 1200,
    },
    {
      cardId: "1006464439409805",
      cardName: "현대카드M",
      colorBackground: "#6BCEF5",
      colorTitle: "#014886",
      merchantCategory: "TRAFFIC",
      price: 48,
    },
    {
      cardId: "1006464439409805",
      cardName: "현대카드M",
      colorBackground: "#6BCEF5",
      colorTitle: "#014886",
      merchantCategory: "MARKET",
      price: 144,
    },
  ];

  const data = {
    labels: labels,
    datasets: [
      discountData.map((data, index) => {
        let cardCategories = {};
        cardCategories.push();
      }),
    ],
  };

  useEffect(() => {
    if (year && month !== undefined) {
      getDiscountInfo();
    }
  }, [year, month]);

  useEffect(() => {
    getDate();

    const ctx = chartRef.current.getContext("2d");
    const myChart = new Chart(ctx, {
      type: "bar",
      data: data,
      options: {
        scales: {
          x: {
            grid: {
              display: false, // x축 그리드 없애기
            },
          },
          y: {
            grid: {
              display: false, // y축 그리드 없애기
            },
            ticks: {
              display: false, // y축 인덱스 없애기
            },
          },
        },
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    // 컴포넌트 언마운트 시 차트를 삭제
    return () => {
      myChart.destroy();
    };
  }, []);

  // const cards = [
  //   "원더카드 (원더 Life)",
  //   "My WE:SH 카드",
  //   "현대카드M",
  //   "NOL 카드",
  // ];

  const getUniqueCards = () => {
    if (discountData && discountData.length > 0) {
      const uniqueCards = Array.from(
        new Set(discountData.map((data) => data.cardName))
      );
      return uniqueCards;
    }
    return [];
  };

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    const discountResponse = await discountAll().then((res) => {
      console.log("[Main Page] discount response : ", res.result);
      return res.result;
    });
    setDiscount(discountResponse);
  };
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
        Credit Report
      </div>
      <div
        className={css`
          background-color: black;
          display: flex;
          flex-direction: column;
          width: 17.56rem;
          padding: 0 2rem;
          height: 8.627rem;
          border-radius: 1.3rem;
          align-items: center;
          margin-top: 2rem;
        `}
      >
        <div
          className={css`
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-top: 1.5rem;
          `}
        >
          <div
            className={css`
              color: white;
              font-size: 1.3rem;
            `}
          >
            이번달 받은 혜택
          </div>
        </div>
        <div
          className={css`
            color: white;
            font-size: 2rem;
            margin-top: 1.1rem;
          `}
        >
          총{" "}
          {discount &&
            discount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          원
        </div>
      </div>
      <div
        className={css`
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          bottom: 0;
          width: 100%;
          height: 65%;
          background-color: white;
          border-top-left-radius: 2rem;
          border-top-right-radius: 2rem;
          padding: 2.5rem;
          box-sizing: border-box;
          box-shadow: 0 -4px 10px rgb(0 0 0 / 10%);
        `}
      >
        <div
          className={css`
            width: 100%;
            display: flex;
          `}
        >
          <div
            className={css`
              --height: 2rem;
              background-color: #f6f6f6;
              line-height: var(--height);
              height: var(--height);
              padding: 0 1rem;
              margin-right: 0.5rem;
              border-radius: 1rem;
              color: #979797;
              box-shadow: 0 5.2px 6.5px rgb(0, 0, 0, 0.1);
            `}
          >
            전체
          </div>
          <div
            className={css`
              width: 75%;
              height: 2.6rem;
              display: flex;
              overflow: scroll;
              ::-webkit-scrollbar {
                display: none;
              }
              ::-webkit-scrollbar-thumb {
                background-color: #979797; /* 스크롤바 색상 */
                border-radius: 1rem; /* 스크롤바 모서리 둥글게 */
              }
            `}
          >
            {getUniqueCards().map((card, index) => (
              <div
                key={index}
                className={css`
                  --height: 2rem;
                  background-color: #f6f6f6;
                  line-height: var(--height);
                  height: var(--height);
                  white-space: nowrap;
                  padding: 0 1rem;
                  margin-right: 0.5rem;
                  border-radius: 1rem;
                  color: #979797;
                  box-shadow: 0 5.2px 6.5px rgb(0, 0, 0, 0.1);
                `}
              >
                {card}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 누적 막대 차트 */}
      <div
        className={css`
          position: absolute;
          bottom: 15vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        <canvas
          ref={chartRef}
          className={css`
            width: 310px;
            /* height: 400px; */
          `}
        />
      </div>
      <NavBar isSelected={"Home"} />
    </div>
  );
}

export default DiscountPage;
