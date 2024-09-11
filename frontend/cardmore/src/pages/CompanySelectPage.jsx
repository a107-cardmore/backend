import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import SquareButton from "../components/Button/SquareButton";
import { useNavigate } from "react-router-dom";

function CompanySelectPage() {
  const navigate = useNavigate();

  const [selectAll, setSelectAll] = useState(false);

  const [companies, setCompanies] = useState([
    { name: "KB 국민", selected: false, logo: "/KB.svg" },
    { name: "삼성", selected: false, logo: "/Samsung.svg" },
    { name: "신한", selected: false, logo: "/Shinhan.svg" },
    { name: "현대", selected: false, logo: "/Hyundai.svg" },
    { name: "하나", selected: false, logo: "/Hana.svg" },
  ]);

  useEffect(() => {
    const selectedCount = companies.filter(
      (company) => company.selected
    ).length;
    if (companies.length !== selectedCount) {
      setSelectAll(false);
    }
  }, [companies]);

  useEffect(() => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company) => ({ ...company, selected: selectAll }))
    );
  }, [selectAll]);

  const companySelect = (index) => {
    setCompanies((prevCompanies) =>
      prevCompanies.map((company, i) =>
        i === index ? { ...company, selected: !company.selected } : company
      )
    );
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
        {companies.map((company, index) => (
          <div
            key={index}
            className={css`
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              color: #959595;
              font-size: 1.3rem;
              margin-bottom: 0.5rem;
            `}
          >
            <img
              className={css`
                width: 10%;
              `}
              src={company.logo}
              alt=""
            />
            <div
              className={css`
                width: 70%;
              `}
            >
              {company.name}
            </div>
            {company.selected ? (
              <img
                className={css`
                  margin: 0.5rem;
                `}
                onClick={() => {
                  companySelect(index);
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
                  companySelect(index);
                }}
                src="/Unselected.svg"
                alt=""
              />
            )}
          </div>
        ))}
        <SquareButton
          name={"다음"}
          marginTop={"3rem"}
          onClick={() => {
            navigate("/card-select");
          }}
        />
      </div>
    </div>
  );
}
export default CompanySelectPage;
