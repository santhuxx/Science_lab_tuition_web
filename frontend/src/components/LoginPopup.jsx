import React, { useState } from "react";
import { Modal, Form, Input, Button, notification } from "antd"; // Import Modal for Popup
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const LoginPopup = ({ isVisible, onClose, onSignupClick }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      // Make the API call to login
      const response = await axios.post("http://localhost:4000/api/auth/login", values);
      const { token, user } = response.data;

      // Store JWT and role in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user)); // Store user info

      // Show success notification
      notification.success({
        message: `Welcome back, ${user.fullName}!`,
      });

      // Navigate based on role
      if (user.role === "teacher") {
        navigate("/admin"); // Navigate to admin panel
      } else if (user.role === "student") {
        navigate("/home2"); // Navigate to home page for students
      }

      onClose(); // Close login modal
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
      title="Login"
      open={isVisible}
      onCancel={onClose}
      footer={null}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleLogin} // Use Ant Design Form's onFinish for form submission
        style={{ maxWidth: "400px", margin: "auto" }}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Login
          </Button>
        </Form.Item>

        <div style={{ textAlign: "center" }}>
          Don't have an account?{" "}
          <Button type="link" onClick={onSignupClick}>
            Sign Up
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default LoginPopup;