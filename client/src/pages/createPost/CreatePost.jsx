import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // For making API requests
import "./createPost.scss";
import Navbar from "../../components/navbar/Navbar";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(""); // To store any error message
  const navigate = useNavigate(); // To navigate after post creation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");
      console.log("token",token);

      if (!token) {
        setError("You need to be logged in to create a post");
        return;
      }

      // Prepare the post data
      const postData = { title, content, image: imageUrl };

      // Make a POST request to create a new post
       const res = await axios.post("http://localhost:5000/api/v2/post/create", postData, {
        headers: {
          Authorization: `Bearer ${token}`, // Add JWT token to request header
        },
      });
      console.log(res);

      // Handle success: Redirect to the posts list or dashboard
      navigate("/"); // You can modify this to navigate to a posts list page
    } catch (err) {
      // Handle error
      setError(
        err.response?.data?.message ||
          "An error occurred while creating the post"
      );
    }
  };

  return (
    <div className="create-post">
      <Navbar />
      <div className="form-container">
        <h1>Create a New Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here"
              rows="6"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste an image URL here"
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}{" "}
          {/* Display error message */}
          <button type="submit" className="submit-button">
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
