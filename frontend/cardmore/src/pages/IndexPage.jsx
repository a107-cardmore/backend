import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

function IndexPage() {
  const navigate = useNavigate();

  return (
    <div className="page1" style={{ width: "100%" }}>
      <button onClick={() => navigate("/map")}>page1</button>
      <button onClick={() => navigate("/main")}>main</button>
    </div>
  );
}

export default IndexPage;
