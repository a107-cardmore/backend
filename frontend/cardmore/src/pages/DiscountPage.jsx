import { css } from "@emotion/css";
import NavBar from "../components/NavBar";
import { discountAll } from "../apis/Discount";
import { useEffect, useState, useRef } from "react";
import { Chart } from "chart.js/auto";

function DiscountPage() {
  const [discount, setDiscount] = useState();
  const chartRef = useRef(null);

  const labels = ["주유", "대형마트", "교통", "교육", "통신", "해외", "생활"];

  const data = {
    labels: labels,
    datasets: [
      {
        data: [300, 50, 100, 200, 80, 90, 10],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
        hoverOffset: 4,
      },
    ],
  };

  useEffect(() => {
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

  const cards = [
    "원더카드 (원더 Life)",
    "My WE:SH 카드",
    "현대카드M",
    "NOL 카드",
  ];

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
            {cards &&
              cards.map((card, index) => (
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
            height: 260px;
          `}
        />
      </div>
      <NavBar isSelected={"Home"} />
    </div>
  );
}

export default DiscountPage;
