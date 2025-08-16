import React, { useState, useEffect } from "react";
import { Menu, Layout, Button, Avatar, Drawer } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import LoginPopup from "./LoginPopup";
import SignupPopup from "./SignupPopup";

const { Header } = Layout;

const NavBar = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isSignupVisible, setIsSignupVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
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
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  const getSelectedKey = () => {
    if (location.pathname.includes("/admin")) return "admin";
    if (location.pathname.includes("/tutorials")) return "tutorials";
    if (location.pathname.includes("/practicals")) return "practicals";
    if (location.pathname.includes("/lessons")) return "lessons";
    if (location.pathname.includes("/about")) return "about";
    if (location.pathname.includes("/contact")) return "contact";
    return "home";
  };

  const toggleDrawer = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  const menuItems = [
    ...(isLoggedIn && user?.role === "teacher"
      ? [{ key: "admin", label: "Admin Page", onClick: () => { navigate("/admin"); toggleDrawer(); } }]
      : []),
    { key: "home", label: "Home", onClick: () => { navigate("/home2"); toggleDrawer(); } },
    { key: "tutorials", label: "Tutorials", onClick: () => { navigate("/tutorials"); toggleDrawer(); } },
    { key: "practicals", label: "Practicals", onClick: () => { navigate("/practicals"); toggleDrawer(); } },
    { key: "lessons", label: "Lessons", onClick: () => { navigate("/lessons"); toggleDrawer(); } },
    { key: "about", label: "About Us", onClick: () => { navigate("/about"); toggleDrawer(); } },
    { key: "contact", label: "Contact Us", onClick: () => { navigate("/contact"); toggleDrawer(); } },
  ];

  return (
    <Header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        backgroundColor: "#001529",
        padding: isMobile ? "0 16px" : "0 24px",
        minHeight: "64px", // Ensure consistent height for vertical centering
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "white",
          fontSize: isMobile ? "16px" : "20px",
          fontWeight: "bold",
        }}
      >
        Science Lab
      </div>

      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[getSelectedKey()]}
        items={menuItems}
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "transparent",
          minWidth: 0,
          display: isMobile ? "none" : "flex",
        }}
      />

      <div
        style={{
          display: isMobile ? "none" : "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {isLoggedIn ? (
          <>
            <Avatar
              icon={<UserOutlined />}
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/profile")}
            />
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button type="primary" onClick={showLoginPopup}>
              Login
            </Button>
            <Button type="default" onClick={showSignupPopup}>
              Sign Up
            </Button>
          </>
        )}
      </div>

      <Button
        type="text"
        icon={<MenuOutlined />}
        onClick={toggleDrawer}
        style={{
          color: "white",
          display: isMobile ? "flex" : "none",
          marginLeft: "50px", // Big space from text
          alignSelf: "center", // Vertically centers the icon in the Header
        }}
      />

      <Drawer
        title="Menu"
        placement="right"
        onClose={toggleDrawer}
        open={isDrawerVisible}
        width={250}
        styles={{
          body: { padding: 0 },
          header: { backgroundColor: "#001529", color: "white" },
        }}
      >
        <Menu
          mode="vertical"
          selectedKeys={[getSelectedKey()]}
          items={menuItems}
          style={{ borderRight: 0 }}
        />
        <div style={{ padding: "16px" }}>
          {isLoggedIn ? (
            <>
              <Button
                type="text"
                icon={<UserOutlined />}
                onClick={() => {
                  navigate("/profile");
                  toggleDrawer();
                }}
                style={{ width: "100%", textAlign: "left", marginBottom: "8px" }}
              >
                Profile
              </Button>
              <Button
                onClick={() => {
                  handleLogout();
                  toggleDrawer();
                }}
                style={{ width: "100%" }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                type="primary"
                onClick={() => {
                  showLoginPopup();
                  toggleDrawer();
                }}
                style={{ width: "100%", marginBottom: "8px" }}
              >
                Login
              </Button>
              <Button
                type="default"
                onClick={() => {
                  showSignupPopup();
                  toggleDrawer();
                }}
                style={{ width: "100%" }}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </Drawer>

      <LoginPopup
        isVisible={isLoginVisible}
        onClose={hideLoginPopup}
        onSignupClick={showSignupPopup}
      />
      <SignupPopup isVisible={isSignupVisible} onClose={hideSignupPopup} />
    </Header>
  );
};

export default NavBar;