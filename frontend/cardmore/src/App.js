import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import IndexPage from "./pages/IndexPage";
import MapPage from "./pages/MapPage";
import LoginPage from "./pages/LoginPage"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/map" element={<MapPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        {/*<Route path="/" element={<Page3 />}></Route> */}
      </Routes>
    </div>
  );
}

export default App;
