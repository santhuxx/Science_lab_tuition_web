import React, { useState } from "react";
import { Modal, Form, Input, Button, notification } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ isVisible, onClose, onSignupClick, onLoginSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://science-lab-tuition-web.vercel.app/api/auth/login",
        values
      );
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      onLoginSuccess(user, token);

      notification.success({ message: `Welcome back, ${user.fullName}!` });
      navigate(user.role === "teacher" ? "/admin" : "/home2");
      onClose();
    } catch (error) {
      notification.error({
        message: "Login failed",
        description: error.response?.data?.message || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={isVisible}
      onCancel={onClose}
      footer={null}
      centered
      closable={false}
      bodyStyle={{
        padding: 0,
        background: "transparent",
        borderRadius: 16,
        overflow: "hidden",
      }}
      style={{
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 40,
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: 16,
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
          animation: "fadeIn 0.5s ease-in-out",
          flexDirection: "column",
        }}
      >
        <h2 style={{ marginBottom: 24, fontWeight: 700, fontSize: 24 }}>
          Welcome Back 👋
        </h2>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleLogin}
          style={{ width: "100%", maxWidth: 350 }}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              size="large"
              style={{
                borderRadius: 12,
                backgroundColor: "#f3f4f0",
                padding: "10px 16px",
              }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please enter your password" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
              size="large"
              style={{
                borderRadius: 12,
                backgroundColor: "#f3f4f0",
                padding: "10px 16px",
              }}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
            style={{
              width: "100%",
              borderRadius: 12,
              fontWeight: "bold",
              marginTop: 8,
            }}
          >
            Login
          </Button>

          <Button
            type="link"
            onClick={onSignupClick}
            style={{
              marginTop: 16,
              display: "block",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            Don't have an account? Sign up
          </Button>
        </Form>
      </div>
    </Modal>
  );
};

export default LoginPopup;
