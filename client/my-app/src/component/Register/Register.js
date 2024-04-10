import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("User");
  const navigate = useNavigate();

  const handleLogin = () => {
    window.location.href = "/login"; 
  };

  const handleRegister = async () => {
    if (!username || !password || !email || !phone || !role) {
      console.error("All fields are required");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:8000/routes/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password, email, phone, role }),
        }
      );

      if (response.ok) {
        console.log("Registration successful");
        navigate("/", { replace: true });
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div>
      <h3>This Register page</h3>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email id"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Phone no"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <select value={role} onClick={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="vendor">Vendor</option>
      </select>
      <button type="submit" onClick={handleRegister}>
        Submit
      </button>
      <br />
      <br />
      <div className="logregbuttom">
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
};

export default Register;
