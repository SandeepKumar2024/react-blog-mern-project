import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./postdetails.scss";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";

const Postdetails = () => {
  const { id } = useParams(); // Get post ID from the URL
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get logged-in user from localStorage (or session storage)
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        // Fetch post data
        const postResponse = await axios.get(`http://localhost:5000/api/v2/post/${id}`);
        const postData = postResponse.data.post;
        setPost(postData);
        setLoading(false);
      } catch (err) {
        setError("Failed to load the post.");
        setLoading(false);
        console.error(err);
      }
    };

    fetchPostData(); 

  }, [id]);

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Handle editing (if logged-in user is the post author or an admin)
  const handleEdit = () => {
    if (loggedInUser && loggedInUser._id && (loggedInUser._id === post?.author?._id || loggedInUser.role === "admin")) {
      navigate(`/post/edit/${id}`); // Navigate to the edit page
    }
  };

  return (
    <div className="post_detail">
      <Navbar />
      <div className="post_container">
        <div className="post_detail_meta">
          <p>By: {post.author.username}</p> 
          <p>Created At: {new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
        <img src={post.image} alt={post.title} className="post_detail_image" />
        <h1 className="post_detail_title">{post.title}</h1>
        <p className="post_detail_content">{post.content}</p>
        
        {/* Conditional Render: Show Edit Button only for the post owner or admin */}
        {(loggedInUser && (loggedInUser._id === post.author?._id || loggedInUser.role === "admin")) && (
          <button className="edit_button" onClick={handleEdit}>
            Edit Post
          </button>
        )}
      </div>
    </div>
  );
};

export default Postdetails;
