import React from "react";
import backgroundImage from "../assets/back.jpg"; // Adjust path if needed
import Footer from "../components/Footer";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div>
      <div style={styles.page}>
        <div style={styles.overlay}></div>

        <div style={styles.content}>
          <div style={styles.lightGrayBox}>
            {/* Top Content: Text & Form */}
            <div style={styles.topSection}>
              {/* Left: Text */}
              <div style={styles.left}>
                <h2 style={styles.heading}><br />We are here to help!</h2>
                <p style={styles.paragraph}>
                  Have questions or need more information? Use the form to send us a message, or contact us directly using the details below.
                </p>

                <p style={styles.paragraph}>
                  <br />
                  <strong>Mobile:</strong> 076 123 4567<br />
                  <strong>Email:</strong>{" "}
                  <a href="mailto:karunajeewaattigala@gmail.com" style={styles.emailLink}>
                  karunajeewaattigala@gmail.com
                  </a>
                </p>
              </div>

              {/* Right: Form */}
              <form style={styles.form} onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" style={styles.input} required />
                <input type="email" placeholder="Email" style={styles.input} required />
                <input type="tel" placeholder="Phone number" style={styles.input} />
                <textarea placeholder="Message" rows={5} style={styles.textarea} required />
                <button type="submit" style={styles.button}>SEND MESSAGE</button>
                <p style={styles.note}>
                  This site is protected by hCaptcha and the hCaptcha{" "}
                  <a href="https://www.hcaptcha.com/privacy" target="_blank" rel="noopener noreferrer">
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a href="https://www.hcaptcha.com/terms" target="_blank" rel="noopener noreferrer">
                    Terms of Service
                  </a>{" "}
                  apply.
                </p>
              </form>
            </div>

            {/* Bottom: Map */}
            <div style={styles.mapWrapper}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.469989617969!2d80.20557787531602!3d7.413120912185798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae323e9513ccb89%3A0xd27beb909ba68cd7!2sScience%20Lab%20%E2%80%93%20Science%20Tuition%20Center%20(Grade%206%20-%2011)!5e0!3m2!1sen!2slk!4v1743931897739!5m2!1sen!2slk"
                style={styles.map}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="location-map"
              ></iframe>
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
    padding: "80px 15px", // Reduced padding for mobile
    display: "flex",
    justifyContent: "center",
  },
  lightGrayBox: {
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    padding: "30px", // Reduced padding for mobile
    width: "100%",
    maxWidth: "1200px",
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  topSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px", // Reduced gap for mobile
    flexDirection: window.innerWidth <= 768 ? "column" : "row", // Stack vertically on mobile
  },
  left: {
    flex: "1 1 300px", // Reduced min-width for better mobile fit
    color: "#333",
  },
  heading: {
    fontSize: window.innerWidth <= 768 ? "24px" : "30px", // Smaller font on mobile
    marginBottom: "15px",
  },
  paragraph: {
    fontSize: window.innerWidth <= 768 ? "15px" : "17px", // Smaller font on mobile
    lineHeight: "1.6",
    color: "#444",
  },
  emailLink: {
    color: "#001529",
    textDecoration: "underline",
  },
  form: {
    flex: "1 1 300px", // Reduced min-width for better mobile fit
    display: "flex",
    flexDirection: "column",
    gap: "12px", // Slightly reduced gap
  },
  input: {
    padding: "10px",
    fontSize: window.innerWidth <= 768 ? "14px" : "15px", // Smaller font on mobile
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    width: "100%", // Ensure inputs don't overflow
    boxSizing: "border-box",
  },
  textarea: {
    padding: "10px",
    fontSize: window.innerWidth <= 768 ? "14px" : "15px", // Smaller font on mobile
    borderRadius: "4px",
    border: "1px solid #ccc",
    resize: "vertical",
    backgroundColor: "#fff",
    width: "100%", // Ensure textarea doesn't overflow
    boxSizing: "border-box",
  },
  button: {
    padding: "12px",
    backgroundColor: "#001529",
    color: "#fff",
    fontWeight: "600",
    fontSize: window.innerWidth <= 768 ? "13px" : "14px", // Smaller font on mobile
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    letterSpacing: "2px",
  },
  note: {
    fontSize: window.innerWidth <= 768 ? "11px" : "12px", // Smaller font on mobile
    color: "#777",
    marginTop: "8px",
  },
  mapWrapper: {
    width: "100%",
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: window.innerWidth <= 768 ? "300px" : "400px", // Smaller map height on mobile
    border: 0,
  },
};

export default Contact;