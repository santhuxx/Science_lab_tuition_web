import React, { useState, useEffect } from "react";
import { Menu, Layout, Button, Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons"; // Import the account icon
import LoginPopup from "./LoginPopup";
import SignupPopup from "./SignupPopup";

const { Header } = Layout;

const NavBar = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSignupVisible, setIsSignupVisible] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Store user data (optional)

  useEffect(() => {
    // Check if the user is logged in by verifying the token
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set state to true if token exists
    if (token) {
      // Optionally, fetch user details here if needed
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData); // Store the user data in state
    }
  }, []);

  const showLoginPopup = () => {
    setIsLoginVisible(true);
  };

  const hideLoginPopup = () => {
    setIsLoginVisible(false);
  };

  const showSignupPopup = () => {
    setIsSignupVisible(true);
  };

  const hideSignupPopup = () => {
    setIsSignupVisible(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Clear user data
    setIsLoggedIn(false); // Update state after logout
    setUser(null); // Clear user data
    navigate("/"); // Redirect to home after logout
  };

  return (
    <Header style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ color: "white", fontSize: "20px" }}>Science Lab</div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["home"]}>
        <Menu.Item key="home">Home</Menu.Item>
        <Menu.Item key="tutorials">Tutorials</Menu.Item>
        <Menu.Item key="practicals">Practicals</Menu.Item>
        <Menu.Item key="lessons">Lessons</Menu.Item>
        <Menu.Item key="about">About Us</Menu.Item>
        <Menu.Item key="contact">Contact Us</Menu.Item>
      </Menu>
      <div style={{ display: "flex", alignItems: "center" }}>
        {isLoggedIn ? (
          <>
            {/* Show Account Icon after login */}
            <Avatar
              icon={<UserOutlined />}
              style={{ marginRight: "8px", cursor: "pointer" }}
              onClick={() => navigate("/profile")} // You can navigate to the profile page
            />
            {/* Show logout button */}
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button type="primary" onClick={showLoginPopup} style={{ marginRight: "8px" }}>
              Login
            </Button>
            <Button type="default" onClick={showSignupPopup}>
              Sign Up
            </Button>
          </>
        )}
      </div>
      <LoginPopup isVisible={isLoginVisible} onClose={hideLoginPopup} onSignupClick={showSignupPopup} />
      <SignupPopup isVisible={isSignupVisible} onClose={hideSignupPopup} />
    </Header>
  );
};

export default NavBar;
