import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import IndexPage from "./pages/IndexPage";
import MapPage from "./pages/MapPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexPage />}></Route>
          <Route path="/map" element={<MapPage />}></Route>
          <Route path="/main" element={<MainPage />}></Route>

          {/*<Route path="/" element={<Page3 />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
