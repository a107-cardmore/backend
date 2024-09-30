import { css } from "@emotion/css";
import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import ExpenditureCard from "../components/ExpenditureCard";
import NavBar from "../components/NavBar";
import Select from "react-select";

import { getTransactionAll } from "../apis/Mypage";

function MyPage() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [transaction, setTransaction] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [cardNameList, setSelectedCardNameList] = useState([{ value: 0, label: "전체" }]);

  const [data, setData] = useState(null);

  const getTransaction = async () => {
    const card = await getTransactionAll();
    setTransaction(card);
  };

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });

    getTransaction();

    // 컴포넌트 언마운트 시 차트를 삭제
    return () => {
      chartInstance.current.destroy();
    };
  }, []);

  //결제 내역
  useEffect(() => {
    if (transaction !== null) {
      setSelectedCardNameList(
        transaction.result.cardNameList.map((name, index) => {
          return {
            value: index,
            label: name,
          };
        })
      );

      const newData = {
        labels: transaction.result.categoryList.map((category) => category.name),
        datasets: [
          {
            label: "소비 금액",
            data: transaction.result.categoryList.map((category) => category.balance),
            backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"],
            hoverOffset: 4,
          },
        ],
      };

      setData(newData);
    }
  }, [transaction]);

  //차트 수정
  useEffect(() => {
    chartInstance.current.data = data;
    chartInstance.current.update();
  }, [data]);

  return (
    <div
      className={css`
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100vh;
        width: 100%;
        background-color: #f6f6f6;
      `}
    >
      <div
        className={css`
          display: flex;
          float: left;
          font-size: 2.5rem;
          padding-top: 5%;
          padding-right: 40%;
          font-weight: bold;
        `}
      >
        My Page
      </div>

      {/* 도넛 차트 */}
      <div
        className={css`
          position: absolute;
          top: 13vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}
      >
        <canvas
          ref={chartRef}
          width="270"
          height="270"
          className={css`
            width: 260px;
            height: 260px;
          `}
        />
      </div>
      <div
        className={css`
          position: absolute;
          top: 8.5vh;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        `}
      >
        <p
          className={css`
            padding: 10px;
            margin: 0;
            font-size: 0.8rem;
          `}
        >
          소비패턴을 기반으로 카드를 추천 받으시겠어요?
        </p>
        <button
          className={css`
            display: flex;
            border-radius: 0.5rem;
            border-style: none;
            width: fit-content;
            text-align: center;
            justify-content: center;
            color: #ffffff;
            font-weight: 700;
            font-size: 0.8rem;
            padding: 5px;
            background-color: #555555;
          `}
        >
          카드 추천 받기
        </button>
      </div>

      {/* 지출 내역 */}
      <div
        className={css`
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          bottom: 0;
          width: 100%;
          height: 50%;
          background-color: white;
          border-top-left-radius: 2rem;
          border-top-right-radius: 2rem;
          padding: 1.5rem 2rem;
          box-sizing: border-box;
          box-shadow: 0 -4px 10px rgb(0 0 0 / 10%);
        `}
      >
        <div
          className={css`
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: center;
            align-items: flex-start;
            margin-bottom: 1.5rem;
          `}
        >
          <div
            className={css`
              width: 10rem;
            `}
          >
            <Select
              className="basic-single"
              classNamePrefix="select"
              defaultValue={cardNameList[0]}
              isDisabled={false}
              isLoading={false}
              isClearable={false}
              isRtl={false}
              isSearchable={false}
              name="color"
              options={cardNameList}
              onChange={(e) => setSelectedCardIndex(e.value)}
            />
          </div>

          {/* <select
            name="cars"
            id="cars"
            onChange={handleSelectChange}
            className={css`
              display: flex;
              border-radius: 1rem;
              padding: 5px 10px;
              color: #979797;
              border: none;
              background: #f6f6f6;
              font-weight: 700;
              font-size: 0.9rem;
              width: 13rem;
              box-shadow: 0 4px 5px rgb(0 0 0 / 10%);
              outline: none;
            `}
          >
            {transaction !== null ? (
              transaction.result.cardNameList.map((name, index) => (
                <option
                  key={index}
                  value={index}
                  className={css`
                    background-color: #ffffff;
                    color: #979797;
                    font-size: 0.9rem;
                    padding: 5px;
                    border: none;
                  `}
                >
                  {name}
                </option>
              ))
            ) : (
              <option
                value="volvo"
                className={css`
                  background-color: #ffffff;
                  color: #979797;
                  font-size: 0.9rem;
                  padding: 5px;
                  border: none;
                `}
              >
                전체
              </option>
            )}
          </select> */}
        </div>
        <div
          className={css`
            display: flex;
            flex-direction: column;
            width: 100%;
            overflow-y: scroll;

            ::-webkit-scrollbar {
              width: 8px;
            }

            ::-webkit-scrollbar-thumb {
              background: rgb(0, 0, 0, 0.1);
              border-radius: 4px;
            }

            ::-webkit-scrollbar-thumb:hover {
              background: rgb(0, 0, 0, 0.4);
            }
          `}
        >
          {/* Props로 데이터 넘겨주기 */}
          <ExpenditureCard
            transactionList={
              transaction !== null ? transaction.result.transactionList[selectedCardIndex] : []
            }
          />
        </div>
      </div>
      <NavBar isSelected={"User"} />
    </div>
  );
}

export default MyPage;
