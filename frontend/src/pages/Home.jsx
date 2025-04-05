import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import backgroundImage from "../assets/back.jpg"; // Ensure the image path is correct

const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT token
      setUser(decoded);
    }
  }, []);

  return (
    <div className="home-container">
      <div className="background">
        <div className="overlay"></div>
        <div className="content">
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

export default Home;
