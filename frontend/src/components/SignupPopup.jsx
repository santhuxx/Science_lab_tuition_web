import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  notification,
  Steps,
} from "antd";
import { signupUser } from "../api/auth";

const { Option } = Select;

const SignupPopup = ({ isVisible, onClose }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Basic Info",
      content: (
        <>
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true, message: "Name required" }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>
          <Form.Item
            name="grade"
            label="Grade"
            rules={[{ required: true, message: "Grade required" }]}
          >
            <Select placeholder="Select grade">
              {Array.from({ length: 6 }, (_, i) => (
                <Option key={i + 6} value={`Grade ${i + 6}`}>
                  Grade {i + 6}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </>
      ),
    },
    {
      title: "Personal",
      content: (
        <>
          <Form.Item
            name="birthDate"
            label="Birth Date"
            rules={[{ required: true, message: "Date required" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Gender required" }]}
          >
            <Select placeholder="Select gender">
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </Form.Item>
        </>
      ),
    },
    {
      title: "Contact",
      content: (
        <>
          <Form.Item
            name="schoolName"
            label="School Name"
            rules={[{ required: true, message: "School required" }]}
          >
            <Input placeholder="ABC College" />
          </Form.Item>
          <Form.Item
            name="parentMobile"
            label="Parent's Mobile"
            rules={[
              { required: true, message: "Mobile required" },
              { pattern: /^[0-9]{10}$/, message: "Valid 10-digit number" },
            ]}
          >
            <Input placeholder="0712345678" />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Account",
      content: (
        <>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email required" },
              { type: "email", message: "Valid email required" },
            ]}
          >
            <Input placeholder="example@mail.com" />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Password required" },
              { min: 6, message: "Minimum 6 characters" },
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Confirm password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Retype password" />
          </Form.Item>
        </>
      ),
    },
  ];

  const handleNext = async () => {
    try {
      await form.validateFields(
        steps[currentStep].content.props.children.map((item) => item.props.name)
      );
      setCurrentStep(currentStep + 1);
    } catch {}
  };

  const handlePrev = () => setCurrentStep(currentStep - 1);

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      await signupUser({ ...values, role: "student" });
      notification.success({
        message: "Signup Successful",
        description: "Your account has been created!",
      });
      form.resetFields();
      onClose();
    } catch (error) {
      notification.error({
        message: "Signup Failed",
        description:
          error.response?.data?.message || "An error occurred. Try again.",
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
      style={{
        borderRadius: "16px",
        maxWidth: "500px",
        width: "100%",
      }}
      bodyStyle={{
        padding: "16px",
      }}
      className="signup-modal"
    >
      <div style={{ marginBottom: "16px" }}>
        <Steps
          current={currentStep}
          size="small"
          responsive
          items={steps.map((item) => ({ title: item.title }))}
        />
      </div>

      <Form form={form} layout="vertical" onFinish={handleFinish}>
        {steps[currentStep].content}
        <div className="form-actions">
          {currentStep > 0 && (
            <Button onClick={handlePrev} className="back-btn">
              Back
            </Button>
          )}
          {currentStep < steps.length - 1 ? (
            <Button
              type="primary"
              onClick={handleNext}
              className="next-btn"
            >
              Next
            </Button>
          ) : (
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="signup-btn"
            >
              Sign Up
            </Button>
          )}
        </div>
      </Form>

      {/* CSS for responsiveness */}
      <style jsx>{`
        .signup-modal {
          top: 10px !important;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 20px;
          justify-content: space-between;
          flex-wrap: wrap;
        }

        .form-actions button {
          flex: 1;
          min-width: 120px;
          height: 40px;
          font-size: 14px;
        }

        @media (max-width: 480px) {
          .signup-modal {
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
            min-width: 100px;
            max-width: 45%;
            height: 36px;
            font-size: 13px;
          }
        }
      `}</style>


    </Modal>
  );
};

export default SignupPopup;
