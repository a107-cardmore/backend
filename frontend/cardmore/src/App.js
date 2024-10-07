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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<IndexPage />}></Route>
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/map" element={<MapPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
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
