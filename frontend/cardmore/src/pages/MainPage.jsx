import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
import Card from "../components/Card";
import NavBar from "../components/NavBar";
// import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

const cardlist = [
  { bgColor: "#fbb89d", inColor: "#fe4437" },
  { bgColor: "#7497F6", inColor: "#0543EC" },
  { bgColor: "#D8F068", inColor: "#00B451" },
];
function MainPage() {
  const _addCard = () => {};
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
          height: 40vh;
          overflow: hidden;
        `}
      >
        <div
          className={css`
            position: absolute;
            top: 3rem;
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
              top: ${(index + 1) * 3.5 + 3}rem;
            `}
          >
            <Card bgColor={data.bgColor} inColor={data.inColor} />
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
    </div>
  );
}

export default MainPage;
