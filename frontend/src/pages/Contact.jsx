import React from "react";
import backgroundImage from "../assets/back.jpg"; // Adjust path if needed
import Footer from "../components/Footer";

const ContactUs = () => {
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
                  <br /><br /><br />
                  <strong>Mobile:</strong> 076 123 4567<br />
                  <strong>Email:</strong>{" "}
                  <a href="mailto:mail@gmail.com" style={styles.emailLink}>
                    mail@gmail.com
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
    padding: "120px 20px",
    display: "flex",
    justifyContent: "center",
  },
  lightGrayBox: {
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    padding: "50px",
    width: "100%",
    maxWidth: "1200px",
    display: "flex",
    flexDirection: "column",
    gap: "40px",
  },
  topSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: "40px",
  },
  left: {
    flex: "1 1 400px",
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
  emailLink: {
    color: "#001529",
    textDecoration: "underline",
  },
  form: {
    flex: "1 1 400px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px",
    fontSize: "15px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#fff",
  },
  textarea: {
    padding: "12px",
    fontSize: "15px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    resize: "vertical",
    backgroundColor: "#fff",
  },
  button: {
    padding: "14px",
    backgroundColor: "#001529",
    color: "#fff",
    fontWeight: "600",
    fontSize: "14px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    letterSpacing: "2px",
  },
  note: {
    fontSize: "12px",
    color: "#777",
    marginTop: "10px",
  },
  mapWrapper: {
    width: "100%",
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "400px",
    border: 0,
  },
};

export default ContactUs;