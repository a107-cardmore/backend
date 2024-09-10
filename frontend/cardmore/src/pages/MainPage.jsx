import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
// import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

function MainPage() {
  return (
    <div
      className={css`
        width: 100%;
        height: 100vh;
      `}
    >
      <div>Hello,</div>
      <div>SooYoung</div>
      <div
        className={css`
          width: 21.56rem;
          height: 13.627rem;
          border-radius: 1rem;
          background-color: lime;
        `}
      >
        <div></div>
      </div>
      <div
        className={css`
          width: 21.56rem;
          height: 13.627rem;
          border-radius: 1rem;
          background-color: #fbb89d;
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
            width: 80%;
            border-bottom: solid 0.2rem #fe4437;
            padding: 1rem 0;
          `}
        >
          <div
            className={css`
              color: #fe4437;
              font-size: 1.7rem;
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
              stroke="#FE4437"
              stroke-width="2"
            />
            <path
              d="M7.625 15.5H23.375M23.375 15.5L15.5 7.625M23.375 15.5L15.5 23.375"
              stroke="#FE4437"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
