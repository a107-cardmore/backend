import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";
import Card from "../components/Card";
// import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

const cardlist = [
  { bgColor: "#fbb89d", inColor: "#fe4437" },
  { bgColor: "#7497F6", inColor: "#0543EC" },
  { bgColor: "#D8F068", inColor: "#00B451" },
];
function MainPage() {
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
      <div>Hello,</div>
      <div>SooYoung</div>
      <div
        className={css`
          width: 90%;
          height: 50vh;
          overflow: hidden;
        `}
      >
        {cardlist.map((data, index) => (
          <div
            className={css`
              position: absolute;
              top: ${index * 3.5 + 3}rem;
            `}
          >
            <Card bgColor={data.bgColor} inColor={data.inColor} />
          </div>
        ))}
        {/* <Card bgColor={"#fbb89d"} inColor={"#fe4437"} />
        <Card bgColor={"#7497F6"} inColor={"#0543EC"} />
        <Card bgColor={"#D8F068"} inColor={"#00B451"} /> */}
      </div>
    </div>
  );
}

export default MainPage;
