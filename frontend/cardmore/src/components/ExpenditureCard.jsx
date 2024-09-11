import React from "react";
import { css } from "@emotion/css";

function ExpenditureCard(){
  return(
    <div className={css`
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #C6C6C6;
      padding : 5px;
    `}>
      <div className={css`
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      `}>
        <div className={css`
          font-weight: 700;
          color : #959595;
          font-size: 1rem;
        `}>
          스타벅스 역삼점
        </div>
        <div className={css`
          display: flex;
          justify-content: space-between;
          width : 6.5rem;
          font-size: 0.9rem;
        `}>
          <span className={css`
            color: #C6C6C6;
          `}>04.21</span>
          <span className={css`
            font-weight: 600;
            color: #FE4437;
          `}>국민카드</span>
        </div>
      </div>
      <div className={css`
        text-align: center;
        line-height : 3rem;
        height: 100%;
        font-size: 1.2rem;
        color : #EE3B24;
      `}>-10,000</div>
    </div>
  );
}

export default ExpenditureCard;