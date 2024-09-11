import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import IndexPage from "./pages/IndexPage";
import MapPage from "./pages/MapPage";
import LoginPage from "./pages/LoginPage";
import SignInPage from "./pages/SignInPage";
import MyDataAgree from "./pages/MyDataAgree";
import CompanySelectPage from "./pages/CompanySelectPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<IndexPage />}></Route>
        <Route path="/main" element={<MainPage />}></Route>
        <Route path="/map" element={<MapPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/signin" element={<SignInPage />}></Route>
        <Route path="/mydata" element={<MyDataAgree />}></Route>
        <Route path="/company-select" element={<CompanySelectPage />}></Route>
        {/*<Route path="/" element={<Page3 />}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
