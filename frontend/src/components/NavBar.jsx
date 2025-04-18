import React, { useState, useEffect } from "react";
import { Menu, Layout, Button, Avatar } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons"; // Import the account icon
import LoginPopup from "./LoginPopup";
import SignupPopup from "./SignupPopup";

const { Header } = Layout;

const NavBar = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSignupVisible, setIsSignupVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // To get the current location
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Store user data (optional)

  useEffect(() => {
    // Check if the user is logged in by verifying the token in localStorage
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData)); // Parse user data if available
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, [localStorage.getItem("token"), localStorage.getItem("user")]); // Dependency on localStorage change

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

  // Determine the selected key based on the current location
  const getSelectedKey = () => {
    if (location.pathname.includes("/admin")) return "admin"; // Highlight the Admin Page if on the /admin route
    if (location.pathname.includes("/tutorials")) return "tutorials";
    if (location.pathname.includes("/practicals")) return "practicals";
    if (location.pathname.includes("/lessons")) return "lessons";
    if (location.pathname.includes("/about")) return "about";
    if (location.pathname.includes("/contact")) return "contact";
    return "home"; // Default to home if no match
  };

  return (
    <Header style={{
      position: "fixed", // fixes top spacing
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 1000,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)", // Optional shadow for depth
      backgroundColor: "#001529", // Keep original color from Ant Design
    }}>
      <div style={{ color: "white", fontSize: "20px" }}>Science Lab</div>
      <Menu theme="dark" mode="horizontal" selectedKeys={[getSelectedKey()]}>
        {isLoggedIn && user?.role === "teacher" && (
          <Menu.Item key="admin" onClick={() => navigate("/admin")}>Admin Page</Menu.Item>
        )}
        <Menu.Item key="home" onClick={() => navigate("/home2")}>Home</Menu.Item>
        <Menu.Item key="tutorials" onClick={() => navigate("/tutorials")}>Tutorials</Menu.Item>
        <Menu.Item key="practicals" onClick={() => navigate("/practicals")}>Practicals</Menu.Item>
        <Menu.Item key="lessons" onClick={() => navigate("/lessons")}>Lessons</Menu.Item>
        <Menu.Item key="about" onClick={() => navigate("/about")}>About Us</Menu.Item>
        <Menu.Item key="contact" onClick={() => navigate("/contact")}>Contact Us</Menu.Item>
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