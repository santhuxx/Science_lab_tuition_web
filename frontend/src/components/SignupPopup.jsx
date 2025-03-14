import React, { useState } from "react";
import { Modal, Form, Input, Select, DatePicker, Button, notification } from "antd";
import { signupUser } from "../api/auth"; // Ensure this API function is correctly implemented

const { Option } = Select;

const SignupPopup = ({ isVisible, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSignup = async (values) => {
    setLoading(true); // Set loading state to true when API call starts
    try {
      // Add default role to values before sending
      const userData = { ...values, role: "student" };

      await signupUser(userData);
      notification.success({ message: "Signup successful!" });
      form.resetFields();
      onClose();
      
    } catch (error) {
      // Improved error handling
      notification.error({
        message: "Signup failed",
        description:
          error.response?.data?.message ||
          error.message ||
          "An unknown error occurred.",
      });
    } finally {
      setLoading(false); // Reset loading state after API call finishes
    }
  };

  const validatePasswords = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Passwords do not match!"));
    },
  });

  return (
    <Modal
      title="Sign Up"
      open={isVisible}
      onCancel={onClose}
      footer={null}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSignup}
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true, message: "Please input your full name!" }]}
        >
          <Input placeholder="Enter your full name" />
        </Form.Item>

        <Form.Item
          name="grade"
          label="Grade"
          rules={[{ required: true, message: "Please select your grade!" }]}
        >
          <Select placeholder="Select your grade">
            {Array.from({ length: 6 }, (_, i) => (
              <Option key={i + 6} value={`Grade ${i + 6}`}>
                Grade {i + 6}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="birthDate"
          label="Birth Date"
          rules={[{ required: true, message: "Please select your birth date!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Please select your gender!" }]}
        >
          <Select placeholder="Select your gender">
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="schoolName"
          label="School Name"
          rules={[{ required: true, message: "Please input your school name!" }]}
        >
          <Input placeholder="Enter your school name" />
        </Form.Item>

        <Form.Item
          name="address"
          label="Address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input placeholder="Enter your address" />
        </Form.Item>

        <Form.Item
          name="parentMobile"
          label="Parent's Mobile Number"
          rules={[
            { required: true, message: "Please input parent's mobile number!" },
            {
              pattern: /^[0-9]{10}$/,
              message: "Please enter a valid 10-digit mobile number!",
            },
          ]}
        >
          <Input placeholder="Enter parent's mobile number" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters!" },
          ]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password!" },
            validatePasswords,
          ]}
        >
          <Input.Password placeholder="Retype your password" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading} // Show loading state on button
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignupPopup;