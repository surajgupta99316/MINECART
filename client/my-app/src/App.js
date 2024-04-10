import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./component/Home/Home";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import Admin from "./component/Admin/Admin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Afterlogin from "./component/Afterlogin/Afterlogin";
import Viewproduct from "./component/Viewproduct/Viewproduct";
import Userpage from "./component/Userpage/Userpage";

function App() {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token") !== null;
  const navigate = useNavigate();
  const userRole = localStorage.getItem("roles");

  useEffect(() => {
    if (
      !isAuthenticated &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      navigate("/");
    }
  }, [isAuthenticated]);
  let content = null;

  useEffect(() => {
    if (userRole) {
      if (userRole === "user") {
        navigate("/userpage");
      } else if (userRole === "vendor") {
        navigate("/afterlogin");
      }
    }
  }, []);
  return (
    <div className="App">
      <h2>MineCart</h2>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/afterlogin" element={<Afterlogin />} />
        <Route path="/:viewproduct" element={<Viewproduct />} />
        <Route path="/userpage" element={<Userpage />} />
      </Routes>
      {content}
    </div>
  );
}

export default App;
