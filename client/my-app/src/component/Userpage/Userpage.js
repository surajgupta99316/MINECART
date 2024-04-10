import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Userpage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 800);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  useEffect(() => {
    handleMyData();
  }, [debouncedSearchTerm]);

  const handleMyData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/routes/posted/search?search=${debouncedSearchTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts); 
      } else {
        console.error("Retrieve failed");
      }
    } catch (err) {
      console.error("Error retrieving data:", err);
    }
  };

  const handleInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <button onClick={handleLogout}>Logout</button> <br />
      <input
        placeholder="Search for post"
        value={searchTerm}
        onChange={handleInput}
      />
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div className="card" key={index}>
            <div className="card-body">
              <h5 className="card-title">Username: {post.username}</h5>
              <p className="card-text">{post.content}</p>
              <p>{post.price}</p>
              <button>View</button>
            </div>
          </div>
        ))
      ) : (
        <p>No posts found</p>
      )}
    </>
  );
};

export default Userpage;
