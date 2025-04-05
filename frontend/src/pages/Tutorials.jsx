import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Card } from "antd";
import backgroundImage from "../assets/back.jpg"; // Adjust path if necessary

const Tutorials = () => {
  const navigate = useNavigate();

  const grades = [
    { grade: 6, path: "/tutorials/grade6" },
    { grade: 7, path: "/tutorials/grade7" },
    { grade: 8, path: "/tutorials/grade8" },
    { grade: 9, path: "/tutorials/grade9" },
    { grade: 10, path: "/tutorials/grade10" },
    { grade: 11, path: "/tutorials/grade11" },
  ];

  const pageStyle = {
    position: "relative",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    color: "#fff",
    textAlign: "center",
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.6)", // Dark overlay for readability
    zIndex: 1,
    backgroundblur: "5px",
    backdropFilter: "blur(1px)", // Blur effect for the overlay
  };

  const contentStyle = {
    position: "relative",
    zIndex: 2,
    paddingTop: "40px", // Additional padding for navbar
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: "50px",
    textshadow: "2px 2px 4px rgba(0, 0, 0, 1)",
  };

  const cardContainerStyle = {
    paddingTop: "50px", // Added padding between navbar and cards
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "20px",
    zIndex: 2,
  };

  const cardStyle = {
    width: 220,
    cursor: "pointer",
    backgroundColor: "#fff",
    color: "#000",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s",
    opacity: 0.9,
  };

  return (
    <div>
      <NavBar />
    <div style={pageStyle}>
      <div style={overlayStyle}></div>
      
      <div style={contentStyle}>
        <h1>Science Tutorials</h1>
        <p>Select your grade to access the tutorials.</p>

        <div style={cardContainerStyle}>
          {grades.map(({ grade, path }) => (
            <Card
              key={grade}
              title={`Grade ${grade}`}
              bordered={true}
              style={cardStyle}
              onClick={() => navigate(path)}
              hoverable
            >
              Click to view Grade {grade} tutorials
            </Card>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Tutorials;