import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Button, Input } from "antd";
import { Avatar } from "antd";
import { UserOutlined, DashboardOutlined,AppstoreAddOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const AdminPanel = () => {
  const [user, setUser] = useState(null);
  const [selectedMenuKey, setSelectedMenuKey] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the token exists
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); // Redirect to home if no token
      return;
    }

    // Get the user data from localStorage
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/"); // Redirect if no user data found
      return;
    }

    // Parse user data and check if the role is teacher
    const parsedUserData = JSON.parse(userData);
    if (parsedUserData?.role !== "teacher") {
      navigate("/"); // Redirect if user is not a teacher
    } else {
      setUser(parsedUserData); // Set user data for admin panel
    }
  }, [navigate]);

  useEffect(() => {
    if (selectedMenuKey === "users" && users.length === 0) {
      setLoading(true);
      fetch("http://localhost:5000/api/users")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch users.");
          }
          return response.json();
        })
        .then((data) => {
          setUsers(data);
          setFilteredUsers(data);
          setError(null);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [selectedMenuKey, users.length]);

  const handleLogout = () => {
    // Remove token and user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/"); // Redirect to home after logout
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

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={200} className="site-layout-background">
      <Menu
          mode="inline"
          selectedKeys={[selectedMenuKey]}
          onSelect={({ key }) => setSelectedMenuKey(key)}
          style={{ height: "100%", borderRight: 0 }}
        >
          <Menu.Item key="1" icon={<DashboardOutlined />} >
            Dashboard
          </Menu.Item>
          <Menu.Item key="users" icon={<UserOutlined />}>
            User Management
          </Menu.Item>
          <Menu.Item key="addItem" icon={<AppstoreAddOutlined />}>
            Add Item
          </Menu.Item>
          {/* Add more menu items here */}
        </Menu>
      </Sider>

      <Layout style={{ padding: "0 0px 24px" }}>
      <Header
          style={{
            padding: 5,
            background: "#0101",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>  Admin Panel  </div>
          <div style={{ display: "flex", alignItems: "center" }}></div>
          <div>
            <Avatar icon={<UserOutlined />} style={{ marginRight: "8px" }} />
            {user && <span>Welcome, {user.fullName}   </span>}
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </Header>
        <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
          {selectedMenuKey === "users" ? (
            <div>
              <h2>User Management</h2>
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={handleSearch}
                style={{ marginBottom: "20px", width: "300px" }}
              />
              {loading ? (
                <p>Loading users...</p>
              ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
              ) : (
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {filteredUsers.map((user) => (
                    <li
                      key={user._id}
                      style={{
                        margin: "10px 0",
                        padding: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                      }}
                    >
                      <strong>Name:</strong> {user.fullName || "N/A"} <br />
                      <strong>Grade:</strong> {user.grade || "N/A"} <br />
                      <strong>Birth Date:</strong> {user.birthDate || "N/A"} <br />
                      <strong>Gender:</strong> {user.gender || "N/A"} <br />
                      <strong>School:</strong> {user.schoolName || "N/A"} <br />
                      <strong>Address:</strong> {user.address || "N/A"} <br />
                      <strong>Parent's M.No:</strong> {user.parentMobile || "N/A"} <br />
                      <strong>Email:</strong> {user.email || "N/A"} <br />
                      <strong>Role:</strong> {user.role || "N/A"}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <h2>Welcome to the Admin Panel</h2>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPanel;
