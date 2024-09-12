import React, { useEffect, useRef } from "react";
import { css } from "@emotion/css";

function CardModal({ bgColor, inColor, setShowModal }) {
  const handleScroll = (event) => {
    event.stopPropagation(); // 스크롤 이벤트 전파 중단
  };

  return (
    <div
      className={css`
        position: absolute;
        background-color: rgb(0, 0, 0, 0.1);
        width: 100%;
        height: 100vh;
        z-index: 2;
      `}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          setShowModal(false);
        }
      }}
    >
      <div
        className={css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 17.56rem;
          padding: 0 2rem;
          height: 13.627rem;
          border-radius: 1rem;
          background-color: ${bgColor};
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
            width: 100%;
            border-bottom: solid 0.2rem ${inColor};
            padding: 1rem 0;
          `}
        >
          <div
            className={css`
              color: ${inColor};
              font-size: 1.5rem;
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
              stroke={inColor}
              stroke-width="2"
            />
            <path
              d="M7.625 15.5H23.375M23.375 15.5L15.5 7.625M23.375 15.5L15.5 23.375"
              stroke={inColor}
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        <div
          className={css`
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            overflow: scroll;

            ::-webkit-scrollbar {
              width: 0.4rem;
            }
            ::-webkit-scrollbar-thumb {
              background-color: ${inColor}; /* 스크롤바 색상 */
              border-radius: 1rem; /* 스크롤바 모서리 둥글게 */
            }
            ::-webkit-scrollbar-corner {
              background-color: transparent; /* 배경색을 투명하게 설정 */
            }
          `}
          onWheel={handleScroll}
        >
          <img
            className={css`
              margin-top: 0.5rem;
            `}
            src="/Barcode.svg"
            alt=""
          />
          <div
            className={css`
              color: ${inColor};
              font-size: 1.4rem;
              font-weight: 800;
              width: 100%;
            `}
          >
            카드 혜택
          </div>
          <div
            className={css`
              width: 100%;
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
            `}
          >
            {[
              { name: "스타벅스", discount: "50%" },
              { name: "스트리밍", discount: "20%" },
              { name: "배달", discount: "10%" },
              { name: "대중교통", discount: "7%" },
              { name: "주유소", discount: "15%" },
            ].map((data) => (
              <div
                className={css`
                  width: 50%;
                  display: flex;
                  flex-direction: row;
                  margin: 0.3rem 0;
                `}
              >
                <div
                  className={css`
                    width: 60%;
                    color: ${inColor};
                  `}
                >
                  {data.name}
                </div>
                <div
                  className={css`
                    width: 40%;
                    color: ${inColor};
                    font-weight: 800;
                  `}
                >
                  {data.discount}
                </div>
              </div>
            ))}
          </div>
          <div
            className={css`
              width: 100%;
              display: flex;
            `}
          >
            <div
              className={css`
                width: 50%;
              `}
            >
              <div
                className={css`
                  color: ${inColor};
                  font-size: 1.2rem;
                  font-weight: 800;
                `}
              >
                전월실적
              </div>
              <div
                className={css`
                  width: 100%;
                  color: ${inColor};
                  margin: 0.3rem 0;
                `}
              >
                최소 30만원
              </div>
            </div>
            <div
              className={css`
                width: 50%;
              `}
            >
              <div
                className={css`
                  color: ${inColor};
                  font-size: 1.2rem;
                  font-weight: 800;
                `}
              >
                연회비
              </div>
              <div
                className={css`
                  width: 100%;
                  color: ${inColor};
                  margin: 0.3rem 0;
                `}
              >
                국내 전용 10,000원
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardModal;
