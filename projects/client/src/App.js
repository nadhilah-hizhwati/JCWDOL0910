import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "./features/users/userSlice";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userToken = localStorage.getItem("user_token");

  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/register") {
      sessionStorage.setItem(
        "lastVisitedPage",
        location.pathname + location.search
      );
    }
  }, [location]);

  useEffect(() => {
    const checkTokenExpiration = () => {
      const expToken = localStorage.getItem("exp_token");
      const currentTimestamp = Math.floor(Date.now() / 1000);

      if (expToken && parseInt(expToken) <= currentTimestamp) {
        dispatch(logoutUser());
        navigate("/login");
      }
    };
    checkTokenExpiration(); // Check token expiration on component mount

    // Check token expiration every second
    const interval = setInterval(checkTokenExpiration, 1000);
    return () => {
      clearInterval(interval); // Clear the interval on component unmount
    };
  }, [dispatch, navigate]);

  useEffect(() => {
    if (
      userToken &&
      (location.pathname === "/login" || location.pathname === "/register")
    ) {
      navigate(sessionStorage.getItem("lastVisitedPage")); //if user tried to access login or register when they login,the user will navigate into last visited page
    }
  }, [userToken, location.pathname, navigate]);

  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
