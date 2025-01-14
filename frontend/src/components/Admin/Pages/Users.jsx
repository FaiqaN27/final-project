import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/config";

const Users = () => {
  const token = localStorage.getItem('token');

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/v1/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
      setUsers(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/v1/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("User deleted successfully!");
      fetchUsers(); // Refresh the list after deletion
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete the user");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="display-4 text-center mb-4">All Users</h1>
      {loading && (
        <center>
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden"></span>
          </div>
        </center>
      )}
      {error && (
        <h3 className="alert alert-danger text-center my-5">{error}</h3>
      )}
      <div className="table-responsive">
        <table className="table table-striped table-dark">
          <thead>
            <tr className="user_table_heading">
              <th scope="col">
                <h5>User Name</h5>
              </th>
              <th scope="col">
                <h5>Email</h5>
              </th>
              <th scope="col">
                <h5>Password</h5>
              </th>
              <th scope="col">
                <h5>Role</h5>
              </th>
              <th scope="col">
                <h5>Action</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.length > 0 ? (
              users?.map((user) => (
                <tr key={user._id} className="user__details my-2">
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>********</td> {/* Masked password */}
                  <td>{user.role}</td>
                  <td >
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center display-5">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
