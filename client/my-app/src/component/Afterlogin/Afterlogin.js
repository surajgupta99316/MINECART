import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import "./Afterlogin.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Afterlogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [post, setPost] = useState("");
  const [price,setPrice] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded.id);
      setUsername(decoded.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handlePost = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/routes/posted/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ post, username,price }),
        }
      );
      console.log("Response:", response);
      if (response.ok) {
        console.log("Post successfully");
        toast("Item added sucessfully");
      } else {
        console.error("Posting failed");
      }
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  return (
    <div>
      <div className="welcome">
        <div className="top-container">
          <h2> {username}</h2>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <input
          type="text"
          value={post}
          onChange={(e) => setPost(e.target.value)}
          placeholder="Enter your post"
        /><br/>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter price"
        /><br/>
        <button onClick={handlePost}>Add items</button>
        <br />
        <button onClick={() => navigate("/" + username)}>
          View product items
        </button>{" "}
        <br />
      </div>
    </div>
  );
};

export default Afterlogin;
