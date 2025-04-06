import React from "react";
import backgroundImage from "../assets/back.jpg"; // Update if needed
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div>
      <div style={styles.page}>
        <div style={styles.overlay}></div>

        <div style={styles.content}>
          <div style={styles.lightGrayBox}>
            <div style={styles.topSection}>
              <div style={styles.left}>
                <h2 style={styles.heading}>About Our Tuition Center<br/><br/></h2>
                <p style={styles.paragraph}>
                  Welcome to the <b>Science Lab</b> – your trusted companion in academic success! We are a dedicated tuition center offering expert guidance in science subjects from Grade 6 to 11.
                </p>
                <p style={styles.paragraph}>
                  Our mission is to help students not only achieve high marks but also truly understand and enjoy science. Led by experienced educators, our center focuses on simplifying complex concepts and boosting students' confidence.
                </p>
                <p style={styles.paragraph}>
                  We provide a structured learning environment with individual attention, practical examples, and modern teaching techniques to ensure each student reaches their full potential.
                </p>
                <p style={styles.paragraph}>
                  Join us and take the first step toward academic excellence. We are here to support your learning journey every step of the way!
                </p>
                <p style={styles.paragraph}>
                  For more information, feel free to contact us or visit our center. We look forward to welcoming you!
                  <br/><br/>
                </p>
                <p style={styles.paragraph}>
                  Best regards,
                  <br />
                  Karunajeewa Attigala.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

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
    padding: "200px 20px",
    display: "flex",
    justifyContent: "center",
  },
  lightGrayBox: {
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    padding: "50px",
    width: "100%",
    maxWidth: "1000px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  topSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: "40px",
  },
  left: {
    flex: "1 1 100%",
    color: "#333",
  },
  heading: {
    fontSize: "30px",
    marginBottom: "20px",
  },
  paragraph: {
    fontSize: "17px",
    lineHeight: "1.8",
    color: "#444",
  },
};

export default AboutUs;