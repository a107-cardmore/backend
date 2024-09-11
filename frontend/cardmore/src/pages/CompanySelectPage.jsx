import { css } from "@emotion/css";
import { useEffect, useState } from "react";

function CompanySelectPage() {
  const [selectAll, setSelectAll] = useState(false);
  const [kb, setKb] = useState(false);
  const [samsung, setSamsung] = useState(false);
  const [shinhan, setShinhan] = useState(false);
  const [hyundai, setHyundai] = useState(false);
  const [hana, setHana] = useState(false);
  useEffect(() => {
    setAll();
  }, [setSelectAll]);

  useEffect(() => {}, [setKb, setSamsung, setShinhan, setHyundai, setHana]);
  const setAll = () => {
    if (selectAll) {
      setKb(true);
      setSamsung(true);
      setShinhan(true);
      setHyundai(true);
      setHana(true);
    }
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
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          bottom: 0;
          width: 100%;
          height: 90%;
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
            color: #959595;
            font-size: 1.2rem;
            font-weight: 700;
          `}
        >
          카드사 선택
        </div>
        <div
          className={css`
            width: 100%;
            display: flex;
            align-items: center;
            color: #959595;
            font-size: 1rem;
            justify-content: end;
          `}
        >
          전체선택
          {selectAll ? (
            <img
              className={css`
                margin: 0.5rem;
              `}
              onClick={() => {
                setSelectAll(false);
              }}
              src="/Selected.svg"
              alt=""
            />
          ) : (
            <img
              className={css`
                margin: 0.5rem;
              `}
              onClick={() => {
                setSelectAll(true);
              }}
              src="/Unselected.svg"
              alt=""
            />
          )}
        </div>
        <div
          className={css`
            width: 100%;
            display: flex;
            align-items: center;
            color: #959595;
            font-size: 1rem;
          `}
        >
          <img src="/KB.svg" alt="" />
          KB 국민
          {selectAll ? (
            <img
              className={css`
                margin: 0.5rem;
              `}
              onClick={() => {
                setSelectAll(false);
              }}
              src="/Selected.svg"
              alt=""
            />
          ) : (
            <img
              className={css`
                margin: 0.5rem;
              `}
              onClick={() => {
                setSelectAll(true);
              }}
              src="/Unselected.svg"
              alt=""
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default CompanySelectPage;
