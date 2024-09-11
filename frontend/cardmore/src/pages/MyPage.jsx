import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import ExpenditureCard from "../components/ExpenditureCard";

function MyPage(){
  return (
    <div className={css`
      position: relative;
      display : flex;
      flex-direction : column;
      justify-content : space-between;
      align-items : center;
      height : 100vh;
      width : 100%;
      background-color :#F6F6F6;
    `}>
      <div className={css`
          display : flex;
          float: left;
          font-size : 2.5rem;
          padding-top: 10%;
          padding-right: 40%;
          font-weight : bold;
      `}>My Page</div>
      {/* chart */}
      <div className={css`
          position: absolute;
          top: 39vh;
          display : flex;
          flex-direction : column;
          justify-content : center;
          align-items : center;
        `}>
        <div></div>
        <div className={css`
          display : flex;
          flex-direction : column;
          align-items : flex-end;
        `}>
          <button className={css`
            display : flex;
            border-radius: 2rem;
            border-style : none;
            width: fit-content;
            text-align: center;
            justify-content: center;
            color : #ffffff;
            font-weight: 700;
            font-size: 1rem;
            padding : 5px 10px;
            background-color: #555555;
          `}>카드 추천 받기</button>
          <p className={css `
            padding : 10px;
            margin: 0;
            font-size: 0.9rem;
          `}>소비패턴을 기반으로 카드를 추천 받으시겠어요?</p>
        </div>
      </div>
      {/* 지출 내역 */}
      <div className={ css`
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
          padding:1.5rem 2rem;
          box-sizing: border-box;
          box-shadow: 0 -4px 10px rgb(0 0 0 / 10%);
      `}>
        <div className={ css`
          display : flex;
          flex-direction : column;
          width : 100%;
          justify-content: center;
          align-items: flex-start;
          margin-bottom: 1.5rem;
        `}>
          <select name="cars" id="cars" className={ css`
            display : flex;
            border-radius: 1rem;
            padding: 5px 10px;
            color : #979797;
            border: none;
            background : #F6F6F6;
            font-weight: 700;
            font-size: 0.9rem;
            width: 13rem;
            box-shadow: 0 4px 5px rgb(0 0 0 / 10%);
            outline: none;
          `}>
            <option value="volvo" className={css `
              background-color: #ffffff;
              color: #979797; 
              font-size: 0.9rem; 
              padding: 5px;
              border: none;
            `}>전체</option>
            <option value="volvo" className={css `
              background-color: #ffffff;
              color: #979797; 
              font-size: 0.9rem; 
              padding: 5px;
              border: none;
            `}>전체</option>
          </select>
        </div>
        <div className={css`
          display : flex;
          flex-direction : column;
          width : 100%;
          overflow-y: scroll;

          ::-webkit-scrollbar {
            width: 8px; /* 스크롤바의 너비 */
          }

          ::-webkit-scrollbar-thumb {
            background: rgb(0, 0, 0, 0.1); /* 스크롤바의 색상 */
            border-radius: 4px; 
          }

          ::-webkit-scrollbar-thumb:hover {
            background: rgb(0, 0, 0, 0.4); /* 마우스 오버 시 스크롤바 색상 */
          }
        `}>
          <ExpenditureCard />
          <ExpenditureCard />
          <ExpenditureCard />
          <ExpenditureCard />
          <ExpenditureCard />
          <ExpenditureCard />
          <ExpenditureCard />
          <ExpenditureCard />
          <ExpenditureCard />
          <ExpenditureCard />
          <ExpenditureCard />
          <ExpenditureCard />
          <ExpenditureCard />
          <ExpenditureCard />
        </div>
      </div>

    </div>
  );
}

export default MyPage;