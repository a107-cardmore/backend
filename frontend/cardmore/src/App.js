import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import IndexPage from "./pages/IndexPage";
import MapPage from "./pages/MapPage";
import LoginPage from "./pages/LoginPage";
import SignInPage from "./pages/SignInPage";
import MyDataAgreePage from "./pages/MyDataAgreePage";
import CompanySelectPage from "./pages/CompanySelectPage";
import MyPage from "./pages/MyPage";
import CardSelectPage from "./pages/CardSelectPage";
import DiscountPage from "./pages/DiscountPage";
import CardRecommendPage from "./pages/CardRecommendPage";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const AccessToken = window.sessionStorage.getItem("accessToken");

  const checkLocation = (locationName) => {
    return location.pathname.startsWith(locationName);
  }

  useEffect(() => {
    // console.log(checkLocation("/signin"));
    // console.log(checkLocation("/"));
    if (!checkLocation("/login") && !checkLocation("/signin")) {
      // console.log(AccessToken);
      if (!AccessToken || AccessToken == null) {
        navigate("/login");
      }
    }
  }, [location.pathname])

  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/map" element={<MapPage />}></Route>
        {/* <Route path="/login" element={<LoginPage />}></Route> */}
        <Route path="/signin" element={<SignInPage />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/mydata" element={<MyDataAgreePage />}></Route>
        <Route path="/company-select" element={<CompanySelectPage />}></Route>
        <Route path="/card-select" element={<CardSelectPage />}></Route>
        <Route path="/discount" element={<DiscountPage />}></Route>
        <Route path="/recommend" element={<CardRecommendPage />}></Route>

        {/*<Route path="/" element={<Page3 />}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
