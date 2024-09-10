import React, { useEffect, useState } from "react";
import { css } from "@emotion/css";

// const BarComponent = styled.div`
//   background-color: black;
//   border-radius: 2rem;
// `;

function NavBar({}) {
  return (
    <div
      css={css`
        position: absolute;
        bottom: 1.5rem;
        width: 80%;
        height: 4rem;
        background-color: black;
        border-radius: 3rem;
        box-shadow: 0 0 10px rgb(0, 0, 0, 0.15);
        z-index: 2;
      `}
    >
      dfdfdf
      <div>
        <img src="" alt="" />
      </div>
      <div>
        <img src="" alt="" />
      </div>
      <div>
        <img src="" alt="" />
      </div>
    </div>
  );
}

export default NavBar;
