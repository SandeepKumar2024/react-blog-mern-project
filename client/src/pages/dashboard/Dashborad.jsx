import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import "./dashboard.scss";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]); // State to hold users
  const [selectedUser, setSelectedUser] = useState(null); // State to hold selected user
  const [posts, setPosts] = useState([]); // State to hold posts for the selected user
  const [error, setError] = useState(null); // State for error handling
  const token = localStorage.getItem("token");
  // console.log("selected posts;",selectedUser)
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user.role;

  // Fetch users on initial load
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v2/auth/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data); // Assuming the response is an array of users
      } catch (err) {
        setError("Failed to load users.");
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  // Fetch posts for the selected user
  useEffect(() => {
    if (selectedUser && selectedUser._id) {
      const fetchPosts = async () => {
        try {
          const userId = selectedUser._id;
          const res = await axios.get(
            `http://localhost:5000/api/v2/post/user/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setPosts(Array.isArray(res.data) ? res.data : []); // Assuming the response contains an array of posts
        } catch (err) {
          setError("Failed to load posts.");
          console.error(err);
        }
      };

      fetchPosts();
    }else{
      setPosts([]);
    }
  }, [selectedUser]);


  // Handle role change for a user
  const handleUserRoleChange = async (userId, newRole) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v2/auth/update/${userId}`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the users state to reflect the new role
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      setError("Failed to update user role.");
      console.error(err);
    }
  };

  // Handle post deletion
  const handleDeletePost = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/v2/post/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update state to remove the deleted post
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (err) {
      setError("Failed to delete post.");
      console.error(err);
    }
  };

  // Handle post editing
  const handleEditPost = (id) => {
    navigate(`/post/edit/${id}`);
  };



  // Error handling
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="dashboard-container">
        <aside className="sidebar">
          <h2>Users</h2>
          <ul>
            {users.map((user) => (
              <li
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={selectedUser?._id === user._id ? "active" : ""}
              >
                {user.username} ({user.role})
              </li>
            ))}
          </ul>
        </aside>
        <main className="main-content">
          {selectedUser ? (
            <div>
              <h2>{selectedUser.username}'s Posts</h2>
              <p>Email: {selectedUser.email}</p>
              <p>
                Role:{" "}
                <select
                  value={selectedUser.role}
                  onChange={(e) =>
                    handleUserRoleChange(selectedUser._id, e.target.value)
                  }
                >
                  <option value="viewer">viewer</option>
                  <option value="editor">editor</option>
                  
                </select>
              </p>
              <div className="posts">
                {posts && posts.length > 0 ? (
                  posts.map((post) => (
                    <div className="post" key={post._id}>
                      <h3>{post.title}</h3>
                      <p>{post.content}</p>
                      <p>Created At: {post.createdAt}</p>
                      <button onClick={() => handleEditPost(post._id)}>
                        Edit
                      </button>
                      <button onClick={() => handleDeletePost(post._id)}>
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No posts available</p>
                )}
              </div>
            </div>
          ) : (
            <p>Select a user to view their posts</p>
          )}
        </main>
        
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

export default Dashboard;
