import {
  BrowserRouter as Router,
  Route,
  Switch,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Dashborad from "./pages/dashboard/Dashborad";
import Postdetails from "./pages/Postdetails/Postdetails";
import Editpage from "./pages/editPage/Editpage";
import CreatePost from "./pages/createPost/CreatePost";
import Privateroutes from "./components/Privateroutes";
import PublicRoute from "./components/PublicRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        {/* Admin Protected Route for Dashboard */}
        <Route
          path="/dashboard"
          element={
            <Privateroutes allowedRoles={["admin"]}>
              <Dashborad />
            </Privateroutes>
          }
        />
        <Route path="/post/:id" element={<Postdetails />} />
        <Route path="/post/edit/:id" element={<Editpage />} />
        <Route path="/post/create" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
