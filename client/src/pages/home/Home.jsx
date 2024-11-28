import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Post from "../../components/post/Post";
import axios from "axios";
import "./home.scss";
import { useEffect, useState } from "react";


const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user.role;
  // console.log("userRole",userRole)
  const [posts, setPosts] = useState([]);
  // console.log(posts.posts)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v2/post");
        setPosts(response.data.posts); 
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="home">
      <Navbar />
      <div className="card_container">
      {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((card) => (
            <Post
              key={card._id}
              id={card._id}
              title={card.title}
              image={card.image}
              content={card.content}
            />
          ))
        ) : (
          <p>Loading...</p> // Display a message if no posts are available
        )}
      </div>
      {(user && userRole === "editor") || userRole === "admin" ? (
        <div className="fab-container" onClick={() => navigate("/post/create")}>
          <div className="tooltip">Create Post</div>
          <div className="fab">+</div>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
