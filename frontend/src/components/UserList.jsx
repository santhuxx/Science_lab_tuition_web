import React from "react";
import { Input, Button } from "antd";

const UserList = ({ users, searchQuery, loading, error, onSearch, onEdit, onDelete }) => {
  return (
    <div>
      <h2>User Management</h2>
      <Input
        placeholder="Search users..."
        value={searchQuery}
        onChange={onSearch}
        style={{ marginBottom: "20px", width: "300px" }}
      />
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {users.map((user) => (
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
              <strong>Role:</strong> {user.role || "N/A"} <br />

              <Button
                type="primary"
                onClick={() => onEdit(user)}
                style={{ marginRight: "10px", marginTop: "10px" }}
              >
                Edit
              </Button>
              <Button
                type="danger"
                onClick={() => onDelete(user._id)}
                style={{ marginTop: "10px" }}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;