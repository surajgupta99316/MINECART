import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const user = localStorage.getItem("roles") === "user";
  const vendor = localStorage.getItem("roles") === "vendor";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
      navigate("/afterlogin", { replace: true });
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/routes/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      console.log("Response:", response);

      if (response.ok) {
        const { token, isAdmin, role } = await response.json();
        console.log("Response Data:", token);
        localStorage.setItem("token", token);
        localStorage.setItem("isAdmin", isAdmin);
        localStorage.setItem("roles", role);
        console.log("Login successful");
        toast.success("Login successful");

        if (isAdmin) {
          navigate("/admin");
        } else if (role === "user") {
          console.log("User role detected. Redirecting to userpage");
          navigate("/userpage", { replace: true });
        } else if (role === "vendor") {
          console.log("Vendor role detected. Redirecting to loginafter page");
           navigate("/afterlogin", { replace: true });
        } else {
          console.log("Unknown role:", role);
        }
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleRegister = () => {
    window.location.href = "/register"; // Redirect to the /register route
  };

  return (
    <div className="logindiv">
      <h4>This is login page</h4>
      <div className="buttonclass">
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit" onClick={handleLogin}>
          Login
        </button>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default Login;





























































