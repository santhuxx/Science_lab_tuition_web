import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { Card } from "antd";
import backgroundImage from "../assets/back.jpg"; // Adjust path if necessary
import Footer from "../components/Footer";

const Practicals = () => {
  const navigate = useNavigate();

  const grades = [
    { grade: 6, path: "/practicals/grade6" },
    { grade: 7, path: "/practicals/grade7" },
    { grade: 8, path: "/practicals/grade8" },
    { grade: 9, path: "/practicals/grade9" },
    { grade: 10, path: "/practicals/grade10" },
    { grade: 11, path: "/practicals/grade11" },
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
    paddingTop: "100px", // Additional padding for navbar
    paddingLeft: "60px",
    paddingRight: "60px",
    paddingBottom: "60px",
    textshadow: "2px 2px 4px rgba(0, 0, 0, 1)",
  };

  const cardContainerStyle = {
    paddingTop: "50px", // Added padding between navbar and cards
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
    marginTop: "20px",
    zIndex: 2,
  };

  const cardStyle = {
    width: 250,
    minHeight: 180,
    cursor: "pointer",
    backgroundColor: "#fff",
    color: "#000",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    transition: "transform 0.2s",
    opacity: 0.9,
  };

  return (
    <div>
        
    <div style={pageStyle}>
      <div style={overlayStyle}></div>
      
      <div style={contentStyle}>
        <h1>Science Practicals</h1>
        <p>Select your grade to access the practicals.</p>

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
              Click to view Grade {grade} practicals
            </Card>
          ))}
        </div>
      </div>
      
    </div>
        <Footer />
    </div>
    
  );
};

export default Practicals;