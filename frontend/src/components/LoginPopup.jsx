import React, { useState } from "react";
import { Modal, Form, Input, Button, notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ isVisible, onClose, onSignupClick }) => {
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

      notification.success({
        message: `Welcome back, ${user.fullName}!`,
      });

      if (user.role === "teacher") navigate("/admin");
      else if (user.role === "student") navigate("/home2");

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
      title={null}
      open={isVisible}
      onCancel={onClose}
      footer={null}
      centered
      style={{ borderRadius: "16px", maxWidth: "450px", width: "95%" }}
      bodyStyle={{ padding: "24px" }}
      className="login-modal"
    >
      <h2 style={{ textAlign: "center", fontWeight: 700, marginBottom: "24px" }}>
        Login
      </h2>

      <Form form={form} layout="vertical" onFinish={handleLogin}>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            placeholder="Enter your email"
            style={{
              borderRadius: "12px",
              border: "none",
              backgroundColor: "#f3f4f6",
              padding: "10px 16px",
              fontSize: "14px",
            }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            placeholder="Enter your password"
            style={{
              borderRadius: "12px",
              border: "none",
              backgroundColor: "#f3f4f6",
              padding: "10px 16px",
              fontSize: "14px",
            }}
          />
        </Form.Item>

        <div className="form-actions">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{
              borderRadius: "12px",
              fontWeight: 500,
              height: "42px",
              fontSize: "14px",
            }}
          >
            Login
          </Button>
          <Button
            type="default"
            onClick={onSignupClick}
            style={{
              borderRadius: "12px",
              fontWeight: 500,
              height: "42px",
              fontSize: "14px",
              backgroundColor: "#f3f4f6",
              color: "#374151",
              border: "none",
            }}
          >
            Sign Up
          </Button>
        </div>
      </Form>

      <style jsx>{`
        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
          justify-content: flex-end;
        }

        @media (max-width: 480px) {
          .login-modal {
            max-width: 95% !important;
            margin: 0 auto;
          }
          .form-actions {
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: nowrap;
          }
          .form-actions button {
            flex: 1;
            min-width: 45%;
            height: 40px;
            font-size: 13px;
          }
        }
      `}</style>
    </Modal>
  );
};

export default LoginPopup;
