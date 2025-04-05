import React from "react";
import { Layout, Typography } from "antd";

const { Footer: AntdFooter } = Layout;
const { Text } = Typography;

const Footer = () => {
  const footerStyle = {
    backgroundColor: "#001529",
    color: "#fff",
    textAlign: "center",
    padding: "20px 0",
    marginTop: "auto", // 👈 key to push footer to bottom when space is available
  };

  return (
    <AntdFooter style={footerStyle}>
      <Text style={{ color: "#fff" }}>
        &copy; {new Date().getFullYear()} Science Lab Tuition | All Rights Reserved
      </Text>
    </AntdFooter>
  );
};

export default Footer;