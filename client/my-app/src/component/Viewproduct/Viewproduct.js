import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Viewproduct.css";
import { useNavigate } from "react-router-dom";

const Viewproduct = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const { viewproduct } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState("");
  const [price, setPrice] = useState("");
  useEffect(() => {
    handleMyData();
  }, [viewproduct]);

  const handleEdit = (content) => {
    setIsEditing(content._id);
    setEditedData(content.content);
    setPrice(content.price);
    console.log(content.price);
  };

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const response = await fetch(
        `http://localhost:8000/routes/posted/deletepost/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const updatedPost = posts.filter((elem, ind) => {
          return id !== elem._id;
        });
        setPosts(updatedPost);
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Retrieve failed");
      }
    } catch (err) {
      throw err;
    }
  };

  const handleSave = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/routes/posted/editpost/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: editedData,
            price: parseFloat(price),
          }),
        }
      );
      if (response.ok) {
        const updatedPosts = posts.map((post) =>
          post._id === id ? { ...post, content: editedData.content } : post
        );
        setPosts(updatedPosts);
        setIsEditing(null);
        setEditedData();
        handleMyData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMyData = async () => {
    try {
      if (viewproduct) {
        const response = await fetch(
          `http://localhost:8000/routes/posted/getmypost/${viewproduct}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setPosts(data.posts); // Update state with fetched posts
        } else {
          console.error("Retrieve failed");
        }
      }
    } catch (err) {
      console.error("Error retrieving data:", err);
    }
  };

  return (
    <>
      <button onClick={() => navigate("/afterlogin")}>back</button>{" "}
      <h3>This is my product</h3>
      {posts.length > 0 ? (
        posts.map((post, index) => (
          <div className="card" key={index}>
            <div className="card-body">
              <h5 className="card-title">Username: {post.username}</h5>
              {isEditing === post._id ? (
                <>
                  <input
                    type="text"
                    value={editedData}
                    onChange={(e) => setEditedData(e.target.value)}
                  />
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </>
              ) : (
                <>
                  <p className="card-text">{post.content}</p>
                  <p className="card-text">{post.price}</p>
                </>
              )}
              <div className="butt">
                {isEditing === post._id ? (
                  <button onClick={() => handleSave(post._id)}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(post)}>Edit</button>
                )}
                &nbsp;
                <button
                  href="#"
                  onClick={() => {
                    handleDelete(post._id);
                  }}
                  className="btn btn-primary"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No product found</p>
      )}
    </>
  );
};

export default Viewproduct;
