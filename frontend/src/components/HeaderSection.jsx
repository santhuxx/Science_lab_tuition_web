import React from "react";
import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const HeaderSection = ({ user, onLogout }) => {
  return (
    <div style={{
      padding: 5,
      background: "#0101",
      display: "flex",
      justifyContent: "space-between",
    }}>
      <div style={{ fontSize: "20px", fontWeight: "bold" }}>Admin Panel</div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {user && (
          <>
            <Avatar icon={<UserOutlined />} style={{ marginRight: "8px" }} />
            <span>Welcome, {user.fullName}</span>
          </>
        )}
      </div>
      <div>
        <Button onClick={onLogout}>Logout</Button>
      </div>
    </div>
  );
};

export default HeaderSection;