import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import "./editpage.scss";

const Editpage = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate();

  // Set up the form state
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch post data when the component mounts
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v2/post/${id}`
        );
        const post = response.data.post;
        setFormData({
          title: post.title,
          content: post.content,
          image: post.image,
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch the post.");
        setLoading(false);
      }
    };
    fetchPostData();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission to update the post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      // Send a PUT request to update the post
      const response = await axios.put(
        `http://localhost:5000/api/v2/post/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Post updated successfully:", response.data);
      // Redirect to the post details page after successful update
      navigate(`/post/${id}`);
    } catch (error) {
      console.error("Error updating post:", error);
      setError("Failed to update the post.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="edit-post">
      <Navbar />
      <div className="edit-post-container">
        <h1>Edit Post</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              name="content"
              rows="5"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="save-button">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Editpage;
