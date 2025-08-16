import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Modal, Form, Input, Button } from "antd";
import { UserOutlined, DashboardOutlined, AppstoreAddOutlined } from "@ant-design/icons";
import UserList from "../components/UserList";
import HeaderSection from "../components/HeaderSection";

const { Sider, Content } = Layout;

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [selectedMenuKey, setSelectedMenuKey] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/");
      return;
    }

    const parsedUserData = JSON.parse(userData);
    if (parsedUserData?.role !== "teacher") {
      navigate("/");
    } else {
      setUser(parsedUserData);
    }
  }, [navigate]);

  useEffect(() => {
    if (selectedMenuKey === "users" && users.length === 0) {
      fetchUsers();
    }
  }, [selectedMenuKey, users.length]);

  const fetchUsers = () => {
    setLoading(true);
    fetch("https://science-lab-tuition-web.vercel.app/api/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
        setError(null);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching users");
        setLoading(false);
      });
  };


  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = users.filter((user) =>
      Object.values(user).some((value) =>
        value?.toString().toLowerCase().includes(query)
      )
    );
    setFilteredUsers(filtered);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    form.setFieldsValue(user); // Populate form with existing user data
    setIsEditModalVisible(true);
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setLoading(true);
      fetch(`https://science-lab-tuition-web.vercel.app/api/users/${userId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete user.");
          }
          // Remove the deleted user from the state
          setUsers(users.filter((user) => user._id !== userId));
          setFilteredUsers(filteredUsers.filter((user) => user._id !== userId));
          setError(null);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  };

  const handleUpdate = async (values) => {
    try {
      const response = await fetch(`https://science-lab-tuition-web.vercel.app/users/${editingUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to update user");

      setIsEditModalVisible(false);
      fetchUsers(); // Refresh users list
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", paddingTop: "64px" }}>
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          selectedKeys={[selectedMenuKey]}
          onSelect={({ key }) => setSelectedMenuKey(key)}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="users" icon={<UserOutlined />}>
            User Management
          </Menu.Item>
          <Menu.Item key="addItem" icon={<AppstoreAddOutlined />}>
            Add Item
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout style={{ padding: "0 24px 24px" }}>
    

        <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
          {selectedMenuKey === "users" ? (
            <UserList
              users={filteredUsers}
              searchQuery={searchQuery}
              loading={loading}
              error={error}
              onSearch={handleSearch}
              onEdit={handleEdit}
              onDelete={handleDelete} // Pass the handleDelete function as a prop
            />
          ) : (
            <h2>Welcome to the Admin Panel</h2>
          )}
        </Content>
      </Layout>

      {/* Edit User Modal */}
      <Modal
        title="Edit User"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsEditModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Save Changes
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item name="fullName" label="Name" rules={[{ required: true, message: "Please enter name" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="grade" label="Grade" rules={[{ required: true, message: "Please enter grade" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="birthDate" label="Birth Date" rules={[{ required: true, type:"date", message: "Please enter birth date" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="Gender" rules={[{ required: true, message: "Please enter your Gender" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="schoolName" label="School" rules={[{ required: true, message: "Please enter School" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="address" label="Address" rules={[{ required: true, message: "Please enter Address" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="parentMobile" label="Parent Mobile" rules={[{ required: true, message: "Please enter Parent Mobile" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Enter valid email" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true, message: "Please enter Role" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default AdminPanel;