import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
import Card from "../components/Card";
import NavBar from "../components/NavBar";
import CardModal from "../components/CardModal";
// import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

const cardlist = [
  { key: 1, bgColor: "#fbb89d", inColor: "#fe4437" },
  { key: 2, bgColor: "#7497F6", inColor: "#0543EC" },
  { key: 3, bgColor: "#D8F068", inColor: "#00B451" },
  { key: 4, bgColor: "#CDB3FA", inColor: "#5B2188" },
  { key: 5, bgColor: "#D3CA9F", inColor: "#844301" },
  { key: 6, bgColor: "#014886", inColor: "#6BCEF5" },
];
function MainPage() {
  const [isSelected, setIsSelected] = useState(10000);
  const [showModal, setShowModal] = useState(false);
  const [startIndex, setStartIndex] = useState(1);

  const _addCard = () => {};
  const _showCard = (key) => {
    // console.log(index);
    if (key === isSelected) {
      setIsSelected(10000);
    } else {
      if (startIndex <= key) {
        setIsSelected(key);
      }
    }
  };

  useEffect(() => {
    console.log("startIndex", startIndex);
    if (startIndex > isSelected) {
      setIsSelected(10000);
    }
  }, [startIndex]);

  useEffect(() => {
    console.log("isSelected", isSelected);
  }, [isSelected]);

  const handleScroll = (e) => {
    const scrollDirection = e.deltaY > 0 ? "down" : "up"; // deltaY를 이용하여 스크롤 방향을 확인

    if (scrollDirection === "down") {
      setStartIndex((prevIndex) =>
        Math.min(prevIndex + 1, cardlist.length - 3)
      ); // 아래로 스크롤 시 증가
    } else {
      setStartIndex((prevIndex) => Math.max(prevIndex - 1, 1)); // 위로 스크롤 시 감소
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll); // 스크롤 이벤트 등록

    return () => {
      window.removeEventListener("wheel", handleScroll); // 컴포넌트 언마운트 시 이벤트 제거
    };
  }, []);

  return (
    <div
      className={css`
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      <div
        className={css`
          font-size: 4rem;
          width: 80%;
          font-family: "Pretendard";
          font-weight: 700;
          margin-top: 2rem;
        `}
      >
        Hello,
      </div>
      <div
        className={css`
          font-size: 3rem;
          width: 80%;
          display: flex;
          justify-content: flex-end;
          font-family: "Pretendard";
          font-weight: 700;
        `}
      >
        SooYoung
      </div>
      <div
        className={css`
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 90%;
          height: 45vh;
          overflow: hidden;
        `}
      >
        <div
          className={css`
            position: absolute;
            top: 1rem;
          `}
        >
          <div
            className={css`
              width: 17.56rem;
              padding: 0 2rem;
              height: 13.627rem;
              border-radius: 1rem;
              background-color: white;
              display: flex;
              flex-direction: column;
              align-items: center;
              box-shadow: 0 0 5px rgb(0, 0, 0, 0.15);
            `}
            onClick={() => console.log("???")}
          >
            <div
              className={css`
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                width: 100%;
                border-bottom: solid 0.2rem black;
                padding: 1rem 0;
              `}
            >
              <div
                className={css`
                  color: black;
                  font-size: 1.5rem;
                `}
              >
                새 카드 등록
              </div>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={_addCard}
              >
                <circle
                  cx="15.75"
                  cy="15.75"
                  r="14.75"
                  stroke="black"
                  stroke-width="2"
                />
                <path
                  d="M15.5 7.625V23.375M7.625 15.5H23.375"
                  stroke="#1E1E1E"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div
              className={css`
                color: black;
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
                color: black;
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
                color: black;
                font-size: 1.2rem;
                width: 100%;
                text-align: end;
                margin-top: 0.3rem;
              `}
            >
              End Date 09/24
            </div>
          </div>
        </div>
        {cardlist.map((data, index) => (
          <div
            className={css`
              position: absolute;
              top: ${(index - startIndex + 2) * 3.5 +
              (isSelected < data.key ? 10 : 1)}rem;
              opacity: ${startIndex > data.key
                ? 0
                : 1}; /* startIndex와 현재 데이터 key가 같으면 사라짐 */
            `}
            onClick={() => _showCard(data.key)}
          >
            <Card
              bgColor={data.bgColor}
              inColor={data.inColor}
              setShowModal={setShowModal}
              isSelected={isSelected}
            />
          </div>
        ))}
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
            margin-top: 1.2rem;
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
              stroke="white"
              stroke-width="2"
            />
            <path
              d="M9.9375 21.5625L21.5625 9.9375M21.5625 9.9375H9.9375M21.5625 9.9375V21.5625"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div
          className={css`
            color: white;
            font-size: 2rem;
            margin-top: 1rem;
          `}
        >
          총 100,000원
        </div>
      </div>
      <NavBar />
      {isSelected && showModal && (
        <CardModal
          inColor={"#fe4437"}
          bgColor={"#FFE6DC"}
          setShowModal={setShowModal}
        ></CardModal>
      )}
    </div>
  );
}

export default MainPage;
