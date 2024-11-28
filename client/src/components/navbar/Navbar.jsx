import { useEffect, useState } from "react";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Set the user from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);

    // Redirect to login or home page after logout
    navigate("/login");
  };
  return (
    <div className="navbar">
      <div className="left">
        <span>PosTer </span>
      </div>
      <div className="right">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Home</span>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>About </span>
        </Link>
        {user && user.role == "admin" && (
          <Link to="/dashboard" style={{textDecoration:"none"}}>
            <span>Admin Dashboard</span>
          </Link>
        )}
        {user ? (
          <span>{user.username}</span>
        ) : (
          <Link to="/login" style={{ textDecoration: "none" }}>
            <span className="login">Sign in</span>
          </Link>
        )}
        {user && <span onClick={handleLogout}>Logout</span>}
      </div>
    </div>
  );
};

export default Navbar;
