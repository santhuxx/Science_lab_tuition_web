import React from "react";
import { Button, Card, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { 
  BookOutlined, 
  ExperimentOutlined, 
  ReadOutlined,
  StarOutlined,
  CheckCircleOutlined,
  UserOutlined
} from "@ant-design/icons";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import backgroundImage from "../assets/back.jpg";

const Home = () => {
  const navigate = useNavigate();

  const styles = {
    page: {
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      position: "relative",
      minHeight: "100vh",
      fontFamily: "'Helvetica Neue', sans-serif",
    },
    overlay: {
      position: "absolute",
      inset: 0,
      background: "rgba(0, 0, 0, 0.6)",
      backdropFilter: "blur(1.5px)",
      zIndex: 1,
    },
    content: {
      position: "relative",
      zIndex: 2,
      paddingTop: "80px",
    },
    heroSection: {
      textAlign: "center",
      padding: "100px 20px 80px",
      color: "white",
    },
    heroTitle: {
      fontSize: window.innerWidth <= 768 ? "32px" : "48px",
      fontWeight: "bold",
      marginBottom: "20px",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
    },
    heroSubtitle: {
      fontSize: window.innerWidth <= 768 ? "18px" : "24px",
      marginBottom: "15px",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
    },
    heroDescription: {
      fontSize: window.innerWidth <= 768 ? "16px" : "18px",
      marginBottom: "40px",
      maxWidth: "600px",
      margin: "0 auto 40px",
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
    },
    heroButtons: {
      gap: "20px",
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    heroButton: {
      height: "50px",
      fontSize: "16px",
      fontWeight: "600",
      borderRadius: "25px",
      padding: "0 30px",
      marginBottom: "10px",
    },
    sectionsContainer: {
      backgroundColor: "#f0f0f0",
      padding: "60px 20px",
    },
    sectionTitle: {
      textAlign: "center",
      fontSize: window.innerWidth <= 768 ? "28px" : "36px",
      marginBottom: "50px",
      color: "#001529",
      fontWeight: "bold",
    },
    cardContainer: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    serviceCard: {
      height: "100%",
      textAlign: "center",
      borderRadius: "15px",
      overflow: "hidden",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    cardIcon: {
      fontSize: "48px",
      color: "#001529",
      marginBottom: "20px",
    },
    cardTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "15px",
      color: "#001529",
    },
    cardDescription: {
      color: "#666",
      lineHeight: "1.6",
    },
    featuresSection: {
      backgroundColor: "white",
      padding: "60px 20px",
    },
    featuresList: {
      maxWidth: "800px",
      margin: "0 auto",
      textAlign: "left",
    },
    featureItem: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
      fontSize: "18px",
      color: "#333",
    },
    featureIcon: {
      color: "#52c41a",
      marginRight: "15px",
      fontSize: "20px",
    },
    statsSection: {
      backgroundColor: "#001529",
      padding: "60px 20px",
      color: "white",
      textAlign: "center",
    },
    statsContainer: {
      maxWidth: "800px",
      margin: "0 auto",
    },
    statItem: {
      marginBottom: "30px",
    },
    statNumber: {
      fontSize: "48px",
      fontWeight: "bold",
      color: "#40a9ff",
      display: "block",
    },
    statLabel: {
      fontSize: "16px",
      color: "#ccc",
    },
  };

  const services = [
    {
      icon: <BookOutlined style={styles.cardIcon} />,
      title: "Science Lessons",
      description: "Comprehensive science lessons for grades 6-11 covering all major topics with easy-to-understand explanations.",
    },
    {
      icon: <ExperimentOutlined style={styles.cardIcon} />,
      title: "Practical Sessions",
      description: "Hands-on laboratory experiments and practical sessions to reinforce theoretical knowledge.",
    },
    {
      icon: <ReadOutlined style={styles.cardIcon} />,
      title: "Study Materials",
      description: "Access to premium study materials, notes, and resources designed for academic excellence.",
    },
  ];

  const features = [
    "Expert teachers with years of experience",
    "Small class sizes for personalized attention",
    "Modern teaching methods and technology",
    "Regular assessments and progress tracking",
    "Flexible payment options available",
    "Online and offline learning modes",
  ];

  return (
    <div>
      <NavBar />
      <div style={styles.page}>
        <div style={styles.overlay}></div>
        
        <div style={styles.content}>
          {/* Hero Section */}
          <div style={styles.heroSection}>
            <h1 style={styles.heroTitle}>Welcome to Science Lab</h1>
            <h2 style={styles.heroSubtitle}>Excellence in Science Education</h2>
            <p style={styles.heroDescription}>
              Join thousands of students who have achieved academic success with our expert-led science tuition for grades 6-11. 
              Master complex concepts through our innovative teaching methods.
            </p>
            <div style={styles.heroButtons}>
              <Button 
                type="primary" 
                size="large" 
                style={styles.heroButton}
                onClick={() => navigate("/lessons")}
              >
                Start Learning
              </Button>
              <Button 
                type="default" 
                size="large" 
                style={styles.heroButton}
                onClick={() => navigate("/about")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div style={styles.sectionsContainer}>
        <h2 style={styles.sectionTitle}>Our Services</h2>
        <div style={styles.cardContainer}>
          <Row gutter={[32, 32]}>
            {services.map((service, index) => (
              <Col xs={24} md={8} key={index}>
                <Card 
                  style={styles.serviceCard}
                  hoverable
                  bodyStyle={{ padding: "40px 20px" }}
                >
                  {service.icon}
                  <h3 style={styles.cardTitle}>{service.title}</h3>
                  <p style={styles.cardDescription}>{service.description}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Features Section */}
      <div style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Why Choose Science Lab?</h2>
        <div style={styles.featuresList}>
          {features.map((feature, index) => (
            <div key={index} style={styles.featureItem}>
              <CheckCircleOutlined style={styles.featureIcon} />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div style={styles.statsSection}>
        <h2 style={styles.sectionTitle}>Our Achievements</h2>
        <div style={styles.statsContainer}>
          <Row gutter={[32, 32]}>
            <Col xs={24} sm={8}>
              <div style={styles.statItem}>
                <span style={styles.statNumber}>500+</span>
                <span style={styles.statLabel}>Students Taught</span>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div style={styles.statItem}>
                <span style={styles.statNumber}>95%</span>
                <span style={styles.statLabel}>Success Rate</span>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div style={styles.statItem}>
                <span style={styles.statNumber}>5+</span>
                <span style={styles.statLabel}>Years Experience</span>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;