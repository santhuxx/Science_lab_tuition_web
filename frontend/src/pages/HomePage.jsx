import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/back.jpg"; // Adjust path if necessary
import { jwtDecode } from "jwt-decode"; // Make sure this is installed

const HomePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode JWT token
        console.log("Decoded Token:", decoded); // ✅ Debugging - Check token structure

        if (decoded.fullName) {
          setUser(decoded);
        } else {
          console.warn("Token does not contain fullName.");
          setUser(null);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token"); // Remove invalid token
        setUser(null);
      }
    }
  }, []);

  const backgroundStyle = {
    position: "relative",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    color: "#fff",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9))",
    zIndex: 1,
  };

  const contentStyle = {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    paddingTop: "50px",
    paddingLeft: "20px",
    paddingRight: "20px",
  };

  return (
    <div>
      <NavBar />
      <div style={backgroundStyle}>
        <div style={overlayStyle}></div>
        <div style={contentStyle}>
          {user ? (
            <h1>Welcome back, {user.fullName}!</h1>
          ) : (
            <h1>Welcome to the Science Lab</h1>
          )}
          <p>Explore tutorials, practicals, and lessons.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
