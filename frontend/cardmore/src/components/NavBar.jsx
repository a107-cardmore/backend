import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
import { useNavigate } from "react-router-dom";

// const BarComponent = styled.div`
//   background-color: black;
//   border-radius: 2rem;
// `;

function NavBar({isSelected}) {
  // const [isSelected, setIsSelected] = useState("Home");
  const navigate = useNavigate();

  const goToMyPage = () => {
    // setIsSelected("User");
    navigate("/mypage");
  };

  const goToHome = () => {
    // setIsSelected("Home");
    navigate("/main");
  };

  const goToMap = () => {
    // setIsSelected("Map");
    navigate("/map");
  };

  return (
    <div
      className={css`
        position: absolute;
        bottom: 1.5rem;
        width: 20.56rem;
        box-sizing: border-box;
        padding: 0.5rem;

        height: 4rem;
        background-color: white;
        border-radius: 3rem;
        box-shadow: 0 0 10px rgb(0, 0, 0, 0.15);
        z-index: 2;

        display: flex;
        flex-direction: row;
        align-items: center;
      `}
    >
      <div
        className={css`
          width: 6.3rem;
          height: 3.2rem;
          box-sizing: border-box;
          background-color: ${isSelected === "User" ? "black" : "white"};
          border-radius: 3rem;
          box-shadow: ${isSelected === "User"
            ? "0 0 10px rgba(0, 0, 0, 0.15)"
            : "none"};

          display: flex;
          justify-content: center;
          align-items: center;
        `}
        onClick={() => goToMyPage()}
      >
        {isSelected === "User" ? (
          <img src="/User_white.svg" alt="" />
        ) : (
          <img src="/User.svg" alt="" />
        )}
      </div>
      <div
        className={css`
          width: 6.3rem;
          height: 3.2rem;
          box-sizing: border-box;
          background-color: ${isSelected === "Home" ? "black" : "white"};
          border-radius: 3rem;
          box-shadow: ${isSelected === "Home"
            ? "0 0 10px rgba(0, 0, 0, 0.15)"
            : "none"};

          display: flex;
          justify-content: center;
          align-items: center;
        `}
        onClick={() => goToHome()}
      >
        {isSelected === "Home" ? (
          <img src="/Home_white.svg" alt="" />
        ) : (
          <img src="/Home.svg" alt="" />
        )}
      </div>

      <div
        className={css`
          width: 6.3rem;
          height: 3.2rem;
          box-sizing: border-box;
          background-color: ${isSelected === "Map" ? "black" : "white"};
          border-radius: 3rem;
          box-shadow: ${isSelected === "Map"
            ? "0 0 10px rgba(0, 0, 0, 0.15)"
            : "none"};

          display: flex;
          justify-content: center;
          align-items: center;
        `}
        onClick={() => goToMap()}
      >
        {isSelected === "Map" ? (
          <img src="/Map_white.svg" alt="" />
        ) : (
          <img src="/Map.svg" alt="" />
        )}
      </div>
    </div>
  );
}

export default NavBar;
