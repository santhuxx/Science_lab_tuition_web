import React, { useState } from "react";
import { Modal, Form, Input, Select, DatePicker, Button, notification, Steps } from "antd";
import { signupUser } from "../api/auth";

const { Option } = Select;

const SignupPopup = ({ isVisible, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const validatePasswords = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Passwords do not match!"));
    },
  });

  const handleSignup = async (values) => {
    setLoading(true);
    try {
      console.log("Form values before processing:", JSON.stringify(values, null, 2));
      const userData = { ...values, role: "student" };
      console.log("Payload sent to API:", JSON.stringify(userData, null, 2));
      await signupUser(userData);
      notification.success({ message: "Signup successful!" });
      form.resetFields();
      setCurrentStep(0);
      onClose();
    } catch (error) {
      console.error("Signup error:", error);
      console.error("Error response:", error.response?.data);
      notification.error({
        message: "Signup failed",
        description:
          error.response?.data?.message ||
          error.message ||
          "An unknown error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    try {
      const fields = steps[currentStep].fields;
      await form.validateFields(fields);
      console.log("Current step values:", await form.getFieldsValue(fields));
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error("Validation error in step", currentStep, ":", error);
    }
  };

  const handlePrev = () => setCurrentStep(currentStep - 1);

  const steps = [
    {
      title: "Basic Info",
      fields: ["fullName", "grade"],
      content: (
        <div style={{ display: currentStep === 0 ? "block" : "none" }}>
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
        </div>
      ),
    },
    {
      title: "Personal",
      fields: ["birthDate", "gender"],
      content: (
        <div style={{ display: currentStep === 1 ? "block" : "none" }}>
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
        </div>
      ),
    },
    {
      title: "Contact",
      fields: ["schoolName", "address", "parentMobile"],
      content: (
        <div style={{ display: currentStep === 2 ? "block" : "none" }}>
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
              { pattern: /^[0-9]{10}$/, message: "Please enter a valid 10-digit mobile number!" },
            ]}
          >
            <Input placeholder="Enter parent's mobile number" />
          </Form.Item>
        </div>
      ),
    },
    {
      title: "Account",
      fields: ["email", "password", "confirmPassword"],
      content: (
        <div style={{ display: currentStep === 3 ? "block" : "none" }}>
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
        </div>
      ),
    },
  ];

  return (
    <Modal
      title={null}
      open={isVisible}
      onCancel={onClose}
      footer={null}
      centered
      style={{
        borderRadius: "16px",
        maxWidth: "500px",
        width: "100%",
        background: "#fff",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
      }}
      bodyStyle={{ padding: "24px" }}
      className="signup-modal"
    >
      <div style={{ marginBottom: "24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "24px", color: "#001529", marginBottom: "16px" }}>
          Create Your Account
        </h2>
        <Steps
          current={currentStep}
          size="small"
          responsive
          items={steps.map((item) => ({ title: item.title }))}
        />
      </div>

      
      <Form form={form} layout="vertical" onFinish={handleSignup}>
        {/* Render all Form.Items, hide non-current steps */}
        {steps.map((step, index) => (
          <div key={index} style={{ display: currentStep === index ? "block" : "none" }}>
            {step.content}
          </div>
        ))}
        <div className="form-actions">
          {currentStep > 0 && (
            <Button
              onClick={handlePrev}
              style={{
                flex: 1,
                minWidth: "120px",
                height: "40px",
                fontSize: "14px",
                borderColor: "#d9d9d9",
                background: "#fff",
              }}
            >
              Back
            </Button>
          )}
          {currentStep < steps.length - 1 ? (
            <Button
              type="primary"
              onClick={handleNext}
              style={{
                flex: 1,
                minWidth: "120px",
                height: "40px",
                fontSize: "14px",
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{
                flex: 1,
                minWidth: "120px",
                height: "40px",
                fontSize: "14px",
              }}
            >
              Sign Up
            </Button>
          )}
        </div>
      </Form>
      <style jsx>{`
        .signup-modal {
          top: 20px !important;
        }
        .signup-modal :global(.ant-modal-content) {
          border-radius: 16px;
          overflow: hidden;
        }
        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        @media (max-width: 480px) {
          .signup-modal {
            max-width: 90% !important;
            margin: 0 auto;
          }
          .form-actions {
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: nowrap;
          }
          .form-actions :global(.ant-btn) {
            min-width: 100px;
            max-width: 48%;
            height: 36px;
            font-size: 13px;
          }
          .signup-modal :global(.ant-steps) {
            padding: 0 8px;
          }
        }
      `}</style>
    </Modal>
  );
};

export default SignupPopup;