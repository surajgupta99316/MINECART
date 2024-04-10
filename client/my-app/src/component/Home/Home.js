import React from "react";
import "./Home.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/afterlogin", { replace: true });
    }
  }, []);
  const handleLogin = () => {
    navigate("/login"); 
  };

  const handleRegister = () => {
    window.location.href = "/register"; 
  };

  return (
    <div>
        <h1>Login or register</h1>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Home;
